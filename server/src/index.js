const express = require('express')
const { PORT, DB_NAME } = require('./config')

const app = express()

// connect DB START
const mongoose = require('mongoose')
mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`)
const db = mongoose.connection
db.on('error', () => console.error('Mongo Failed to Connect!!!!'))
db.on('connected', () => console.log('Mongo Connected'))
// connect DB END

// 中间件
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const morgan = require('morgan')
app.use(morgan('tiny'))

const routes = require('./routes')
routes(app)

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`)
})
