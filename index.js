const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require('body-parser')
const router = require('./src/routes/user.routes.js')
require('dotenv').config()


const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(bodyParser.json())
app.use(router)


app.listen(port,()=>{
    console.log('App is listening on',port);
})