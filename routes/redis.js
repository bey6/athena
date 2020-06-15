const router = require('koa-router')()
const redis = require('../service/redis')
const Response = require('../classes/BaseResponse')

router.prefix('/redis')

router.get('/', async (ctx) => {
  await ctx.render('redis/index')
})

router.get('/add', async (ctx) => {
  await ctx.render('redis/add')
})

router.post('/add', async (ctx) => {
  let res = new Response()
  if (ctx.request.body.key && ctx.request.body.value) {
    let result = await redis.add({
      key: ctx.request.body.key,
      value: ctx.request.body.value,
      desc: ctx.request.body.desc,
    })
    if (result === true) {
      res.code = 200
      let cachedValue = await redis.get(ctx.request.body.key)
      res.data = {
        key: ctx.request.body.key,
        value: cachedValue,
      }
    } else {
      res.code = 400
      res.data = result
    }
  } else {
    res.code = 400
    res.msg = 'the key and value is required.'
  }
  ctx.body = res
})

router.get('/get', async (ctx) => {
  let payload = {}
  if (ctx.query.key) {
    try {
      payload.key = ctx.query.key
      let res = await redis.get(ctx.query.key)
      if (typeof res === 'object') {
        payload.cachedValue = JSON.stringify(res)
      } else {
        payload.cachedValue = res
      }
    } catch (error) {
      payload.cachedValue = JSON.stringify(error)
    }
  }
  await ctx.render('redis/get', payload)
})

module.exports = router
