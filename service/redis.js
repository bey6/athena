const fetch = require('node-fetch')

const cacheurl = 'http://xhdev.docimaxvip.com:6638'

module.exports.add = async function ({ key, value, desc }) {
  try {
    let url = encodeURI(`${cacheurl}/api/Values/Add`),
      body = JSON.stringify({
        key,
        describe: desc,
        obj: value,
      })
    const json = await (
      await fetch(url, {
        method: 'post',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json()
    return json
  } catch (error) {
    throw error
  }
}

module.exports.modify = async function ({ key, value }) {
  // ...
}

module.exports.remove = async function (key) {
  // ...
}

module.exports.get = async function (key) {
  try {
    let url = encodeURI(`${cacheurl}/api/values/get?key=${key}`)
    const json = await (await fetch(url)).json()
    return json
  } catch (error) {
    throw error
  }
}
