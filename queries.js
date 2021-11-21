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

const GetMessageByID = (req, res) => {
  pool.query(`SELECT * FROM MESSAGE WHERE ID = $1`, [parseInt(req.params.id)], (error, r) => {
    if (error) {
      throw error
    }
    res.status(200).json(r.rows)
  })
}

const CreateMessage = (req, res) => {
  const { body, parentid, senderid, receiverid, isread} = req.body
  pool.query(`INSERT INTO MESSAGE (BODY, PARENTID, SENDERID, RECEIVERID, ISREAD) VALUES ($1, $2, $3, $4, $5)`, [body, parentid, senderid, receiverid, isread], (error, r) => {
    if (error) {
      throw error
    }
    res.status(200).send(`message created`)
  })
}

const AllMessageByUserID = (req, res)=>{
  const { senderid, receiverid } = req.body
  pool.query(`SELECT * FROM MESSAGE WHERE SENDERID = $1 AND RECEIVERID = $2 ORDER BY CREATEDDATE DESC`, [senderid, receiverid], (err, r)=>{
    if(err){
      throw err
    }
    res.status(200).json(r.rows)
  })
}

const ReplyMessage = (req, res) => {
  const { senderid, receiverid , body} = req.body
  pool.query(`SELECT * FROM MESSAGE WHERE SENDERID = $1 AND RECEIVERID = $2 `, [receiverid, senderid], (err, r) => {
    if(err){
      throw err
    }
    if(r.rowCount < 1){
      res.status(200).send(`No conversation`)
    } else {
      pool.query(`INSERT INTO MESSAGE (BODY, SENDERID, RECEIVERID) VALUES ($1, $2, $3)`, [body, senderid, receiverid], (er, re) => {
        if (er) {
          throw er
        }
        res.status(200).send(`message created`)
      })
    }    
  })
}

const AllConversationBySender = (req, res) => {
  const { senderid } = req.body
  pool.query(`SELECT A.CONVERSATION, A.BODY, B.UNREAD FROM (SELECT DISTINCT ON (RECEIVERID) RECEIVERID, CONCAT(SENDERID, '-', RECEIVERID) AS CONVERSATION , CREATEDDATE, BODY 
  FROM MESSAGE 
  WHERE SENDERID = $1 
  ORDER BY RECEIVERID, CREATEDDATE DESC) A
  LEFT JOIN 
  (SELECT RECEIVERID, SUM(CASE WHEN ISREAD=FALSE THEN 1 ELSE 0 END) AS UNREAD
  FROM MESSAGE
  WHERE SENDERID = $2
  GROUP BY RECEIVERID) B
  ON A.RECEIVERID = b.RECEIVERID`, [senderid, senderid], (err, r) => {
    if(err) {
      throw err
    }
    res.status(200).json(r.rows)
  })
}

module.exports = {
  GetUsers,
  GetUserByID,
  CreateUser,
  UpdateUser,
  DeleteUser,

  GetMessages,
  GetMessageByID,
  CreateMessage,

  AllMessageByUserID,
  ReplyMessage,
  AllConversationBySender
}