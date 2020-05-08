const router = require('koa-router')()
const Mock = require('mockjs')
const fs = require('fs')

router.prefix('/mock')

router.get('/', async (ctx) => {
  await ctx.render('mock/index', {
    msg: 'mock page',
  })
})

router.post('/api', async (ctx) => {
  if (ctx.request.body.api_path && ctx.request.body.method) {
    let current = fs.readFileSync('public/apis.json', 'utf8'),
      file = JSON.parse(current)

    file.apis.push({
      name: ctx.request.body.api_path,
      method: ctx.request.body.method,
    })
    let apis_string = JSON.stringify(file)
    let buffer = Buffer.from(apis_string)
    fs.writeFileSync('public/apis.json', buffer)
  }

  ctx.body = 'save success!'
})

router.get('/getCaseNo', async (ctx) => {
  let year = Mock.mock("@date('yyyy')"),
    caseNum = Mock.mock(/\d{4}/),
    data = Mock.mock({
      id: Mock.mock('@id'),
      caseNum: `(${year})京01民初${caseNum}号`,
      'transType|1': ['当事人', '法院内部人员'],
      transName: Mock.mock('@cname'),
      'transCourt|1': ['立案庭', '民一庭', '行政庭'],
      pageCount: /\d{3}/,
    }),
    res = {
      code: 200,
      msg: '',
      data,
    }

  ctx.body = res
})

module.exports = router
