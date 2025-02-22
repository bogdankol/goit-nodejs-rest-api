const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')
const authRouter = require('./routes/api/auth')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

require('dotenv').config()

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/api/users', authRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message })
})

module.exports = app
