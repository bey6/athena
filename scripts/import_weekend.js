const { sendRequest } = require('./requestAPI')
const fs = require('fs')

function getAllWeekend(y) {
  let date = new Date(`${y}-01-01`)
  let year = date.getFullYear()
  let m,
    d,
    day,
    dayNum,
    yearAllWeekend = []
  for (m = 1; m <= 12; m++) {
    switch (m) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        dayNum = 31
        break
      case 4:
      case 6:
      case 9:
      case 11:
        dayNum = 30
        break
      case 2:
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
          dayNum = 29
        } else {
          dayNum = 28
        }
        break
    }
    for (d = 1; d <= dayNum; d++) {
      date.setMonth(m - 1, d)
      day = date.getDay()
      if (day == 0) {
        yearAllWeekend.push({
          holiday: `${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()}`,
        })
      } else if (day == 6) {
        yearAllWeekend.push({
          holiday: `${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()}`,
        })
      }
    }
  }
  return yearAllWeekend
}

// run those year's weekend holiday into database.
// startYear: start from this year(includes this year)
// endYear: end to this year(includes this year)
async function runThisYears(
  startYear = 1980,
  endYear = 2050,
  ipport = 'xhdev.docimaxvip.com:6627'
) {
  let res,
    temp = []
  for (let i = startYear; i <= endYear; i++) {
    temp = getAllWeekend(i)
    res = await sendRequest(`http://${ipport}/api/values/PostAddHoliday`, temp)
    if (res.errorCode === 200) {
      console.log(`year: ${i}, weekend import success!`)
    } else {
      console.log(`ERROR: year:${i}`)
      console.log(res)
    }
  }
}

runThisYears()
