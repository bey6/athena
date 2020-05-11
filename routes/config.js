const router = require('koa-router')()
const fetch = require('node-fetch')
const BaseResponse = require('../classes/BaseResponse')

outer.prefix('/config')

router.get('/initialization', async (ctx) => {
  let res = new BaseResponse(),
    url = encodeURI(
      'http://xhdev.docimaxvip.com:6607/api/values/getvalue?source=TraceDevelop&environment=Develop&type=URL&key=TraceDevelop'
    ),
    pickName = function (label) {
      if (label && label.split('-')) {
        return label.split('-')[1]
      }
      return label
    }

  try {
    const json = await (await fetch(url)).json()
    res.data.list = json.map((d, idx) => ({
      id: idx,
      label: pickName(d.n),
      value: d.c,
      acronym: d.p,
    }))
    res.data.total = res.data.list.length
  } catch (error) {
    res.code = error.code
    res.msg = error.message
  }
  ctx.body = res
})
