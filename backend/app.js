const express = require('express')
const app = express()
const cors = require('cors')
const usersRoute = require('./routes/users')
const destinationsRoute = require('./routes/destinations')
const userPreferencesRoute = require('./routes/usersPreferences')


app.use(express.json())
app.use(cors())
app.use('/users', usersRoute)
app.use('/destinations', destinationsRoute)
app.use('/usersPreferences', userPreferencesRoute)


app.get('/', (req, res) => {
  res.json('Hello World!')
})


module.exports = app;