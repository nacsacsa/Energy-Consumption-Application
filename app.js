const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const meterRoutes = require('./routes/meter');
const meterReadingRoutes = require('./routes/reading');
const consumptionRoutes = require('./routes/consumption');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

app.use('/meter', meterRoutes);
app.use('/reading', meterReadingRoutes);
app.use('/consumption', consumptionRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: error.message
    });
});

module.exports = app;