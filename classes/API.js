module.exports = class API {
  constructor() {
    this.id = '' // unique
    this.purpose = '' // API 用途
    this.path = '' // API PATH
    this.method = '' // API HTTP METHOD
    this.params = [] // API 参数
    this.response = {} // 响应体
    this.errorRate = 0.2 // 出错率
  }
}
