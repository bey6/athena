const router = require('koa-router')()
const Mock = require('mockjs')

router.prefix('/consult')

// 病案查询: 列表数据
router.get('/medicalRecords', async (ctx, next) => {
  let res = Mock.mock({
    code: 200,
    msg: '',
    data: {
      total: 300,
      'data|10-100': [
        {
          id: () => Mock.mock('@id'),
          mrid: /\d{7}/,
          patientName: () => Mock.mock('@cname'),
          leaveTime: () => Mock.mock("@date('yyyy-MM-dd HH:mm')"),
          'leaveDepartment|+1': [
            '妇产科',
            '骨科',
            '内科',
            '放射科',
            '男科',
            '外科',
            '化验科',
          ],
          'mrtype|+1': ['门急诊', '住院'],
        },
      ],
    },
  })
  res.data.total = res.data.data.length
  ctx.body = res
})

// 提交申请
router.post('/consultApply', async (ctx, next) => {
  ctx.body = {
    code: 200,
    msg: '',
    data: {},
  }
})

// 获取申请记录
router.get('/applyRecords', async (ctx, next) => {
  let res = {
    code: 200,
    msg: '',
    data: {
      total: 239,
      'data|10-100': [
        {
          id: () => Mock.mock('@id'),
          mrid: /\d{7}/,
          patientName: () => Mock.mock('@cname'),
          leaveTime: () => Mock.mock("@date('yyyy-MM-dd HH:mm')"),
          'leaveDepartment|+1': [
            '妇产科',
            '骨科',
            '内科',
            '放射科',
            '男科',
            '外科',
            '化验科',
          ],
          'mrtype|+1': ['门急诊', '住院'],
        },
      ],
    },
  }
  ctx.body = ctx.query
})

module.exports = router
