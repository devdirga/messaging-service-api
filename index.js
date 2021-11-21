const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const app = express()
const port = 3000

app.listen(port,()=>{
  console.log(`Running in port : ${port}`)
})