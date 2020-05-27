const { sendRequest } = require('./requestAPI')
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

// Split the request into multiple times.
// To pass a parameter can modify count per times pass.
// The default count per times is 20 items.
async function loopRequest(ipport, countPerTime = 20) {
  let payload = boxPayload(holiday),
    times = Math.ceil(payload.length / countPerTime),
    res
  for (let i = 0; i < times; i++) {
    res = await sendRequest(
      `http://${ipport}/api/values/PostAddHoliday`,
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

// 把传入的 url 修改为协和部署的 示踪后端服务器 url 即可
// 🌈 Run
loopRequest('xhdev.docimaxvip.com:6627')
