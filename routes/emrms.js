const router = require('koa-router')()
const Mock = require('mockjs')

router.prefix('/emrms')

router.post('/judge', async (ctx, next) => {
  ctx.body = {
    code: 200,
    msg: '',
    data: {},
  }
})

router.get('/judgeList', async (ctx, next) => {
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
          'district|+1': ['东院区', '西院区', '国疗'],
          'judge|+1': ['二级；保健', '一级；丢失，封存', '三级；'],
        },
      ],
    },
  })
  res.data.total = res.data.data.length
  ctx.body = res
})

router.get('/judgeRecordList', async (ctx, next) => {
  let name = Mock.mock('@cname'),
    res = Mock.mock({
      code: 200,
      msg: '',
      'data|1-10': [
        {
          recordId: () => Mock.mock('@id'),
          judgeId: () => Mock.mock('@id'),
          recordDate: () => Mock.mock("@date('yyyy-MM-dd HH:mm')"),
          'recordDescription|+1': [
            `${name}，修改病案状态，“丢失”，修改为“封存”`,
            `${name}，修改病案等级，“一级”，修改为“三级”`,
          ],
        },
      ],
    })

  res.data = res.data.sort(
    (x, y) => new Date(y.recordDate) - new Date(x.recordDate)
  )

  ctx.body = res
})

module.exports = router
