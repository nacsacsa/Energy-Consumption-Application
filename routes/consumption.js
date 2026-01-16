const express = require('express')
const router = express.Router()
const db = require('../database/database')

router.get('/', (req, res) => {
    const { meter_id, from, to } = req.query

    if (!meter_id) {
        return res.status(400).json({ error: 'meter_id is required' })
    }

    if (!from || !to) {
        return res.status(400).json({ error: 'from and to are required' })
    }

    const sqlFrom = 'SELECT reading FROM meter_reading WHERE timestamp LIKE ? and meter_id = ? ORDER BY reading DESC LIMIT 1'
    const sqlTo = 'SELECT reading FROM meter_reading WHERE timestamp LIKE ? and meter_id = ? ORDER BY reading DESC LIMIT 1'

    db.get(sqlFrom, [`${from}%`, meter_id], (err, rowFrom) => {
        if (err) return res.status(500).json({ error: err.message })
        if (!rowFrom) return res.status(404).json({ error: 'No readings found for start time' })

        db.get(sqlTo, [`${to}%`, meter_id], (err, rowTo) => {
            if (err) return res.status(500).json({ error: err.message })
            if (!rowTo) return res.status(404).json({ error: 'No readings found for end time' })

            const consumption = rowTo.reading - rowFrom.reading
            res.status(200).json({ from: rowFrom.reading, to: rowTo.reading, consumption })
        })
    })
})

module.exports = router