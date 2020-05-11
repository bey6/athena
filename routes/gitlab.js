const router = require('koa-router')()
const fetch = require('node-fetch')

router.prefix('/gitlab')

router.get('/', async (ctx) => {
  await ctx.render('gitlab/index')
})

router.post('/release', async (ctx) => {})

module.exports = router
