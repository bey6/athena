const router = require('koa-router')()
const Mock = require('mockjs')

router.prefix('/consult')

// 🍊 病案列表查询接口
router.get('/medicalRecords', async (ctx) => {
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

// 🍊 提交申请
router.post('/consultApply', async (ctx) => {
  ctx.body = {
    code: 200,
    msg: '',
    data: {},
  }
})

// 🍊 我的申请记录
router.get('/applyRecords', async (ctx) => {
  if (!ctx.query.userId) {
    ctx.body = {
      code: 400,
      msg: '操作人id不可为空',
      data: {},
    }
    return
  }
  let res = Mock.mock({
    code: 200,
    msg: '',
    data: {
      total: 239,
      'data|10-100': [
        {
          applyId: () => Mock.mock('@id'),
          applyTime: () => Mock.mock("@date('yyyy-MM-dd HH:mm:ss')"),
          reviewer: () => Mock.mock('@cname'),
          reviewTime: () => Mock.mock("@date('yyyy-MM-dd HH:mm:ss')"),
          'reviewState|+1': ['待审批', '审批通过', '审批未通过'],
          'reviewCommont|+1': [
            '💬 You have a new message.',
            '😉 要偷摸看哦',
            '✋ 丑拒',
          ],
        },
      ],
    },
  })
  res.data.total = res.data.data.length
  ctx.body = res
})

// 🍊 撤回申请
router.post('/recallApply', async (ctx) => {
  let payload = ctx.request.body
  if (!payload.applyId) {
    ctx.body = {
      code: 400,
      msg: '申请编号不可为空',
      data: {},
    }
    return
  }
  if (!payload.userId) {
    ctx.body = {
      code: 400,
      msg: '操作人id不可为空',
      data: {},
    }
    return
  }
  ctx.body = {
    code: 200,
    msg: '',
    data: {},
  }
})

// 🍊 查看病案
router.get('/applyDetail', async (ctx) => {
  if (!ctx.query.applyId) {
    ctx.body = {
      code: 400,
      msg: 'applyId 不可为空',
    }
    return
  }
  let res = Mock.mock({
    Code: '00000',
    Msg: '',
    ResponseContent: {
      total: '0',
      'data|10-100': [
        {
          id: () => Mock.mock('@id'),
          mrid: /\d{7}/,
          patientName: () => Mock.mock('@cname'),
          leaveTime: () => Mock.mock("@date('yyyy-MM-dd HH:mm:ss')"),
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
          'previewState|+1': ['已预览', '未预览'],
        },
      ],
    },
  })
  res.ResponseContent.total = res.ResponseContent.data.length
  ctx.body = res
})

module.exports = router
