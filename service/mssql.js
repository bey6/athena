const sql = require('mssql')

module.exports.getDepartment = async (deleted) => {
  try {
    let pool = await sql.connect(
        'mssql://sa:Docimax@123@172.30.199.163/dev/SecurityDB'
      ),
      deletedCondition = ''
    if (deleted) {
      deletedCondition = 'where deleted=${deleted}'
    }
    const result = await pool.query(
      `select id, name as label, depcode as value, pinyinshort as acronym, note as type from Base_Department ${deletedCondition}`
    )
    return result
  } catch (err) {
    throw err
  }
}
