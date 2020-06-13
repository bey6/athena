const router = require('koa-router')()
const fetch = require('node-fetch')
const BaseResponse = require('../classes/BaseResponse')
const sql = require('../service/mssql.js')

router.prefix('/dictionary')

router.get('/district', async (ctx) => {
  let res = new BaseResponse()
  try {
    res.data.list = [
      { id: 0, label: '协和东院', value: '1' },
      { id: 1, label: '协和西院', value: '2' },
      { id: 2, label: '东院国疗', value: '3' },
      { id: 3, label: '西院国疗', value: '4' },
    ]
  } catch (error) {
    res.code = error.code
    res.msg = error.message
  } finally {
    ctx.body = res
  }
})

// 获取科室部门
router.get('/department', async (ctx) => {
  let res = new BaseResponse(),
    pickName = function (label) {
      if (label && label.split('-').length > 1) {
        return label.split('-')[1]
      }
      return label
    }

  try {
    let result = await sql.getDepartment(ctx.query.deleted)

    let list = result.recordset.map((d) => ({
      ...d,
      id: d.id.trim(),
      label: pickName(d.label),
    }))

    // 过滤类型
    if (ctx.query.type) {
      switch (ctx.query.type) {
        case 'e': // 科室
        case 'w': // 病房
        case 'd': // 药房
        case 'em': // 急诊
          console.log('into')
          list = list.filter((d) => d.type === ctx.query.type.toUpperCase())
          break
        default:
          break
      }
    }

    list = list.map((d) => ({
      id: d.id.trim(),
      label: pickName(d.label),
      value: d.value,
      acronym: d.acronym,
    }))

    // 过滤院区
    if (ctx.query.district) {
      switch (ctx.query.district) {
        case '1':
          res.data.list = list.filter(
            (d) =>
              !d.label.includes('(西院)') &&
              !d.label.includes('（西院）') &&
              !d.label.includes('(西院国际医疗)') &&
              !d.label.includes('（西院国际医疗）') &&
              !d.label.includes('国际医疗')
          )
          break
        case '2':
          res.data.list = list.filter(
            (d) => d.label.includes('(西院)') || d.label.includes('（西院）')
          )
          break
        case '3':
          res.data.list = list.filter(
            (d) =>
              !d.label.includes('（西院国际医疗）') &&
              !d.label.includes('(西院国际医疗)') &&
              d.label.includes('国际医疗')
          )
          break
        case '4':
          res.data.list = list.filter(
            (d) =>
              d.label.includes('(西院国际医疗)') ||
              d.label.includes('（西院国际医疗）')
          )
          break
        default:
          res.data.list = list
          break
      }
    } else {
      res.data.list = list
    }
    res.data.total = res.data.list.length
  } catch (error) {
    res.code = error.code
    res.msg = error.message
  } finally {
    ctx.body = res
  }
})

// 获取用户
router.get('/user', async (ctx) => {
  let res = new BaseResponse(),
    url = encodeURI(
      'http://xhdev.docimaxvip.com:6617/api/values/GetValue?dicColumn=术者'
    )

  try {
    const json = await (await fetch(url)).json()
    res.data.list = json.map((d, idx) => ({
      id: idx,
      label: d.n,
      value: d.c ? d.c.trim() : '',
      acronym: d.p,
    }))
    res.data.total = res.data.list.length
  } catch (error) {
    res.code = error.code || 500
    res.msg = error.message
  }
  ctx.body = res
})

// 获取主题与条件
router.get('/topicConditions', async (ctx) => {
  if (!ctx.query.user_name) {
    ctx.body = {
      code: 400,
      msg: '缺少 user_name 参数',
      data: {},
    }
    return
  }

  let res = new BaseResponse(),
    url = encodeURI(
      'http://xhdev.docimaxvip.com:6617/api/values/GetStandardConditions?username=' +
        ctx.query.user_name
    )

  try {
    const json = await (await fetch(url)).json()
    if (ctx.query.pattern && ctx.query.pattern === 'flat') {
      const topic = json.map((t) => t.name),
        newStructure = []
      topic.forEach((t, i) => {
        json
          .find((f) => f.name === t)
          .library.forEach((l, k) => {
            newStructure.push({
              id: i.toString() + k.toString(),
              topic: t,
              label: l.Item1,
              value: l.Item2,
            })
          })
      })
      res.data.list = newStructure
    } else {
      const restructure = json.map((t, idx) => {
        let nValue = t.library.map((l, lidx) => ({
          id: idx.toString() + lidx.toString(),
          label: l.Item1,
          value: l.Item2,
        }))

        return { id: idx, label: t.name, value: nValue }
      })
      res.data.list = restructure
    }
    res.data.total = res.data.list.length
  } catch (error) {
    res.code = error.code || 500
    res.msg = error.message
  }
  ctx.body = res
})

// 获取编目项
router.get('/category', async (ctx) => {
  let res = new BaseResponse(),
    type = ctx.query.type

  try {
    const json = await (
      await fetch(
        `http://172.30.199.154:8087/api/Consult/ErmMenu?catalogueType=${type}`
      )
    ).json()
    res.code = json.Code
    res.msg = json.Msg
    res.data.total = json.ResponseContent.length
    res.data.list = json.ResponseContent.map((c, idx) => ({
      id: idx,
      label: c.categoryName,
      value: c.categoryId,
    }))
  } catch (error) {
    res.code = error.code || 500
    res.msg = error.message
  }
  ctx.body = res
})

module.exports = router
