const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const meterRoutes = require('./controllers/meter')
const meterReadingRoutes = require('./controllers/meterReading')
const consumptionRoutes = require('./controllers/consumption')

app.use('/meter', meterRoutes)
app.use('/meterReading', meterReadingRoutes)
app.use('/consumption', consumptionRoutes)

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;