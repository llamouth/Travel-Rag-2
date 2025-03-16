const express = require('express')
const app = express()
const cors = require('cors')
const usersRoute = require('./routes/users')
const destinationsRoute = require('./routes/destinations')

app.use(express.json())
app.use(cors())
app.use('/users', usersRoute)
app.use('/destinations', destinationsRoute)

app.get('/', (req, res) => {
  res.json('Hello World!')
})


module.exports = app;