const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const app = express()
const port = 3000

app.use(bodyParser.json({}))
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get(`/user`, db.GetUsers)
app.get('/user/:id', db.GetUserByID)
app.post('/user', db.CreateUser)
app.put('/user/:id', db.UpdateUser)
app.delete('/user/:id', db.DeleteUser)

app.get(`/message`, db.GetMessages)
app.get('/message/:id', db.GetMessageByID)
app.post('/message', db.CreateMessage)

app.post(`/allmessagebyuserid`, db.AllMessageByUserID)
app.post(`/ReplyMessage`, db.ReplyMessage)
app.post(`/AllConversationBySender`, db.AllConversationBySender)

app.listen(port,()=>{
  console.log(`Running in port : ${port}`)
})