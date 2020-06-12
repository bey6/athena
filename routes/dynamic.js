const router = require('koa-router')()
const Mock = require('mockjs')
const fs = require('fs')

const file = fs.readFileSync('stores/apis.json', 'utf8'),
  { apis } = JSON.parse(file)

apis.forEach((api) => {
  router[api.method](`${api.path}`, async (ctx) => {
    let res = {},
      data = {
        list: {},
      },
      target = 'list',
      list = {}

    api.response.forEach((fields) => {
      target = fields.fields_layer === 'root' ? data : list
      switch (fields.fields_type) {
        case 'id':
          target[fields.fields_name] = () => Mock.mock('@id')
          break

        case 'name':
          target[fields.fields_name] = () => Mock.mock('@cname')
          break

        case 'gender':
          target[`${fields.fields_name}|1`] = ['男', '女']
          break

        case 'address':
          target[fields.fields_name] = () => Mock.mock('@county(true)')
          break

        case 'nation':
          target[`${fields.fields_name}|1`] = [
            '汉族',
            '满族',
            '蒙古族',
            '回族',
            '藏族',
            '维吾尔族',
            '苗族',
            '彝族',
            '壮族',
            '布依族',
            '侗族',
            '瑶族',
            '白族',
            '土家族',
            '哈尼族',
            '哈萨克族',
            '傣族',
            '黎族',
            '傈僳族',
            '佤族',
            '畲族',
            '高山族',
            '拉祜族',
            '水族',
            '东乡族',
            '纳西族',
            '景颇族',
            '柯尔克孜族',
            '土族',
            '达斡尔族',
            '仫佬族',
            '羌族',
            '布朗族',
            '撒拉族',
            '毛南族',
            '仡佬族',
            '锡伯族',
            '阿昌族',
            '普米族',
            '朝鲜族',
            '塔吉克族',
            '怒族',
            '乌孜别克族',
            '俄罗斯族',
            '鄂温克族',
            '德昂族',
            '保安族',
            '裕固族',
            '京族',
            '塔塔尔族',
            '独龙族',
            '鄂伦春族',
            '赫哲族',
            '门巴族',
            '珞巴族',
            '基诺族',
          ]
          break

        case 'date':
          target[fields.fields_name] = () => Mock.mock('@date')
          break

        case 'datetime':
          target[fields.fields_name] = () => Mock.mock('@datetime')
          break

        case 'colorhex':
          target[fields.fields_name] = () => Mock.mock('@hex')
          break

        case 'colorrgb':
          target[fields.fields_name] = () => Mock.mock('@rgb')
          break

        case 'number':
          target[fields.fields_name] = () => Mock.mock(/\d{5}/)
          break

        case 'float':
          target[fields.fields_name] = () => Mock.mock('@float(60, 100)')
          break

        case 'dictionary':
          target[`${fields.fields_name}|1`] = fields.fields_range
            ? fields.fields_range.split(',')
            : []
          break

        default:
          target[fields.fields_name] = fields.fields_range || 'no value'
          break
      }
    })

    data['list|10-200'] = [list]
    res = Mock.mock({
      code: 200,
      msg: `🌈 Generate by athena mock api.`,
      data,
    })
    res.data.total = res.data.list.length
    ctx.body = res
  })
})

module.exports = router
