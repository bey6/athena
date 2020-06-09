const router = require('koa-router')()
const pkg = require('../package.json')

router.get('/', async (ctx, next) => {
  let url = 'http://localhost:6677'
  if (process.env.NODE_ENV === 'production') {
    url = 'http://xhdev.docimaxvip.com:6677'
  }
  await ctx.render('index', {
    title: 'ATHENA',
    version: pkg.version,
    url,
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
