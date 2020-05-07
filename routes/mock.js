const router = require('koa-router')()
const Mock = require('mockjs')

router.prefix('/mock')

router.get('/', async (ctx) => {
  await ctx.render('mock/index', {
    msg: 'mock page',
  })
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
