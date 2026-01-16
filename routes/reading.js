const express = require('express')
const router = express.Router()
const db = require('../database/database')

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM meter_reading'

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }

        res.status(200).json(rows)
    })
})

router.get('/', (req, res) => {
    const { id } = req.query
    const sql = 'SELECT * FROM meter_reading WHERE id = ?'

    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }

        if (!row) {
            return res.status(404).json({ error: 'Meter reading not found' })
        }

        res.status(200).json(row)
    })
})

router.post('/create', (req, res) => {
    const { meter_id, reading, timestamp } = req.body
    
    if (!reading) {
        return res.status(400).json({ error: 'reading is mandatory' })
    }

    const sql = 'INSERT INTO meter_reading (timestamp, meter_id, reading) VALUES (?, ?, ?)'

    db.run(sql, [timestamp, meter_id, reading], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(201).json({
            id: this.lastID,
            meter_id,
            reading,
            timestamp: timestamp
        })
    })
})

router.put('/modify/', (req, res) => {
    const { id } = req.query
    const { meter_id, reading, timestamp } = req.body

    if (!reading) {
        return res.status(400).json({ error: 'Reading is mandatory' })
    }

    const sql = 'UPDATE meter_reading SET meter_id = ?, reading = ?, timestamp = ? WHERE id = ?'

    db.run(sql, [meter_id, reading, timestamp, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message })
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Meter reading not found' })
        }

        res.status(200).json({
            id: parseInt(id),
            meter_id,
            reading,
            timestamp
        })
    })
})

router.delete('/delete/', (req, res) => {
    const { id } = req.query

    const sql = 'DELETE from meter_reading WHERE id = ?'

    db.run(sql, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message })
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Meter reading not found' })
        }

        res.status(200).json()
    })
})

module.exports = router