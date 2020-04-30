const request = require('koa2-request')

module.exports.testConsultApply = async () => {
  let options = {
    method: 'post',
    url: 'http://localhost:3000/consult/consultApply',
    json: {
      priSerialNo: 'id1,id2,id3,...',
      dateStart: 'yyyy-MM-dd 00:00:01',
      dateEnd: 'yyyy-MM-dd 23:59:59',
      reason: 'reason_id',
      memo: '备注信息',
      outpatient: 'op1,op2,op3,...',
      inpatient: 'ip1,ip2,ip3,...',
      emergency: 'e1,e2,e3,...',
    },
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }
  const res = await request(options)
  return res.body
}

module.exports.testMedicalRecords = async () => {
  let options = {
    method: 'get',
    url: 'http://localhost:3000/consult/medicalRecords',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    josn: {
      mrid: '20125546',
      mrtype: '1',
      leaveDepartment: 'd22331',
      dateStart: '2019-05-01 00:00:01',
      dateEnd: '2019-05-01 23:59:59',
      page: '1',
      count: '每页数量',
    },
  }
  const res = await request(options)
  return res.body
}
