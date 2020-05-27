const fetch = require('node-fetch')

// To send the httprequest for all holidays.
// It returen a promise, so you can use await to receive it.
exports.sendRequest = async function (url, payload) {
  url = encodeURI(url)
  return (
    await fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  ).json()
}
