const { testConsultApply, testMedicalRecords } = require('./test_consult')

function test(...api) {
  api.reduce((promise, api) => {
    return promise.then(() => {
      return api().then((res) => {
        console.log(res.code)
        if (res.code === 200) {
          console.log('function: [' + api.name + '] -> \033[32m 200 \033[39m')
        } else {
          console.log('function: [' + api.name + '] -> \033[32m error \033[39m')
        }
      })
    })
  }, Promise.resolve())
}

test(testConsultApply, testMedicalRecords)
