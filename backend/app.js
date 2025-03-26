const express = require('express')
const app = express()
const cors = require('cors')

const usersRoute = require('./routes/users')
const destinationsRoute = require('./routes/destinations')
const userPreferencesRoute = require('./routes/usersPreferences')
const userRecommendationsRoute = require('./routes/userRecommendations')
const kaggleDataRoute = require('./routes/kaggleData')
const userFavoritesRoute = require('./routes/userFavorites')
const geminiRoute = require('./routes/gemini')


app.use(express.json())
app.use(cors())

app.use('/users', usersRoute)
app.use('/destinations', destinationsRoute)
app.use('/gemini', geminiRoute)
app.use('/userPreferences', userPreferencesRoute)
app.use('/userRecommendations', userRecommendationsRoute)
app.use('/kaggleData', kaggleDataRoute)
app.use('/userFavorites', userFavoritesRoute)

app.get('/', (req, res) => {
  res.json('Hello World!')
})

app.get('*', (req, res) => {
  res.status(404).json({ error: 'Not found' })
})

module.exports = app;