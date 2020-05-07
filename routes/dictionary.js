const router = require('koa-router')()
const fetch = require('node-fetch')
const BaseResponse = require('../classes/BaseResponse')

router.prefix('/dictionary')

// 获取科室部门
router.get('/department', async (ctx) => {
  let res = new BaseResponse(),
    url = encodeURI(
      'http://xhdev.docimaxvip.com:6617/api/values/GetValue?dicColumn=入院科别'
    ),
    pickName = function (label) {
      if (label && label.split('-')) {
        return label.split('-')[1]
      }
      return label
    }

  try {
    const json = await (await fetch(url)).json()
    res.data.list = json.map((d, idx) => ({
      id: idx,
      label: pickName(d.n),
      value: d.c,
      acronym: d.p,
    }))
    res.data.total = res.data.list.length
  } catch (error) {
    res.code = error.code
    res.msg = error.message
  }
  ctx.body = res
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
