const router = require('koa-router')()
const path = require('path')
const fs = require('fs')

const file = fs.readFileSync('stores/apis.json', 'utf8'),
  { apis } = JSON.parse(file)

apis.forEach((api) => {
  router[api.method](`${api.name}`, async (ctx) => {
    ctx.body = {
      code: 200,
      msg: `test api ${api.name}`,
      data: {
        total: 200,
        list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
    }
  })
})

module.exports = router
