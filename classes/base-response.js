module.exports = class BaseResponse {
  constructor() {
    this.code = 200
    this.msg = ''
    this.data = {
      total: 0,
      list: [],
    }
  }
}
