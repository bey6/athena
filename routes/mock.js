const router = require('koa-router')()
const Mock = require('mockjs')
const fs = require('fs')

router.prefix('/mock')

router.get('/', async (ctx) => {
  await ctx.render('mock/index', {
    msg: 'mock page',
  })
})

router.get('/api', async (ctx) => {
  const file = fs.readFileSync('stores/apis.json', 'utf8'),
    { apis } = JSON.parse(file)
  await ctx.render('mock/api', {
    apis: apis,
  })
})

router.post('/api', async (ctx) => {
  // console.log(ctx.request.body)

  if (
    ctx.request.body.api_path &&
    ctx.request.body.api_method &&
    ctx.request.body.api_name
  ) {
    let current = fs.readFileSync('stores/apis.json', 'utf8'),
      file = JSON.parse(current)

    if (file.apis.find((api) => api.path === ctx.request.body.api_path)) {
      ctx.body = {
        code: 201,
        msg: `🤷 The api with path: '${ctx.request.body.api_path}' is already exist.`,
      }
      return
    }

    let res = []

    ctx.request.body.fields_name.forEach((fields, idx) => {
      res.push({
        fields_name: fields,
        fields_type: ctx.request.body.fields_type[idx],
        fields_range: ctx.request.body.fields_range[idx].trim(),
      })
    })

    file.apis.push({
      name: ctx.request.body.api_name,
      path: ctx.request.body.api_path,
      method: ctx.request.body.api_method,
      response: res,
    })

    let apis_string = JSON.stringify(file)
    let buffer = Buffer.from(apis_string)
    fs.writeFileSync('stores/apis.json', buffer)
    ctx.redirect('/mock/api')
  } else {
    ctx.body = {
      code: 400,
      msg: '🤷 The path and name is required.',
    }
  }
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
