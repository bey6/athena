const router = require('koa-router')()

router.prefix('/mock')

router.get('/', async (ctx) => {
  await ctx.render('mock/index', {
    msg: 'mock page',
  })
})

module.exports = router
