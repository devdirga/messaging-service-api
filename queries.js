const Pool = require('pg').Pool
const pool = new Pool({
  user:'postgres',
  host:'localhost',
  database:'proo',
  password:'admin123',
  port:5432
})

/**
 * User
 * 
*/

const GetUsers = (req, res) => {
  pool.query(`SELECT * FROM USERS ORDER BY ID ASC`, (err, r)=>{
    if (err) { throw err }
    res.status(200).json(r.rows)
  })
}

module.exports = {
  GetUsers,
}