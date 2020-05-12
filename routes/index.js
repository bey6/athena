const router = require('koa-router')()
const pkg = require('../package.json')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'ATHENA',
    version: pkg.version,
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json',
  }
})

module.exports = router
