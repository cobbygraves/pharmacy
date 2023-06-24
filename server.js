const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()

const server = express()

server.use(express.json({ limit: '200mb', extended: true }))
server.use(express.urlencoded({ limit: '200mb', extended: true }))
server.use(cors())
server.use(express.static(path.join(__dirname, 'client', 'build')))

//sales routes
const salesRoutes = require('./routes/sales')
server.use('/sales', salesRoutes)

//user routes
const usersRoutes = require('./routes/users')
server.use('/user', usersRoutes)

//drug routes
const drugRoutes = require('./routes/drugs')
server.use('/drug', drugRoutes)

//index file route
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

//server listening at port 5000
const PORT = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_URL, (err) => {
  if (!err) {
    server.listen(PORT, (err) => {
      if (err) {
        console.log('Error Listerning @ PORT')
      } else {
        console.log('Connection Successful')
      }
    })
  } else {
    console.log('Error Connecting To Database')
  }
})
