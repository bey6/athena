const router = require('koa-router')()
const Mock = require('mockjs')
const fs = require('fs')

const file = fs.readFileSync('stores/apis.json', 'utf8'),
  { apis } = JSON.parse(file)

apis.forEach((api) => {
  router[api.method](`${api.path}`, async (ctx) => {
    let res = {},
      data = {}
    api.response.forEach((fields) => {
      switch (fields.fields_type) {
        case 'id':
          data[fields.fields_name] = () => Mock.mock('@id')

        case 'name':
          data[fields.fields_name] = () => Mock.mock('@cname')
          break

        case 'gender':
          data[`${fields.fields_name}|1`] = ['男', '女']
          break

        case 'address':
          data[fields.fields_name] = () => Mock.mock('@county(true)')
          break

        case 'date':
          data[fields.fields_name] = () => Mock.mock('@date')
          break

        case 'datetime':
          data[fields.fields_name] = () => Mock.mock('@datetime')
          break

        case 'number':
          data[fields.fields_name] = () => Mock.mock(/\d{5}/)
          break

        case 'dictionary':
          data[`${fields.fields_name}|1`] = fields.fields_range
            ? fields.fields_range.split(',')
            : []
          break

        default:
          data[fields.fields_name] = fields.fields_range || 'no value'
          break
      }
    })

    res = Mock.mock({
      code: 200,
      msg: `🦄 Generate by athena mock api.`,
      data: {
        total: 0,
        'list|10-200': [data],
      },
    })
    ctx.body = res
  })
})

module.exports = router
