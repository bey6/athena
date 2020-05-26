const fetch = require('node-fetch')
const fs = require('fs')

// Get the holiday list we prepared.
const file = fs.readFileSync('holidays.json', 'utf8'),
  { holiday } = JSON.parse(file)

// To box the holiday list into a list who api needs.
// If the parameter is undefinded, it will return [].
function boxPayload(holiday = []) {
  if (holiday.length === 0) return []
  let resList = []
  holiday.forEach((item) => {
    item.list.forEach((h) => {
      resList.push({ holiday: h.date })
    })
  })
  return resList
}

// To send the httprequest for all holidays
async function sendRequest(url, payload) {
  url = encodeURI(url)
  return (
    await fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  ).json()
}

// Split the request into multiple times.
// To pass a parameter can modify count per times pass.
// The default count per times is 20 items.
async function loopRequest(countPerTime = 20) {
  let payload = boxPayload(holiday),
    times = Math.ceil(payload.length / countPerTime),
    res
  for (let i = 0; i < times; i++) {
    res = await sendRequest(
      'http://xhdev.docimaxvip.com:6627/api/values/PostAddHoliday',
      payload.slice(i * countPerTime, (i + 1) * countPerTime)
    )
    console.log(
      `times:${i}, payload.length: ${
        payload.slice(i * countPerTime, (i + 1) * countPerTime).length
      }`
    )
    console.log(res)
  }
}

// 🌈 Run
loopRequest()
