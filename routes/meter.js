const express = require('express')
const router = express.Router()
const db = require('../database/database')

router.post('/', (req, res, next) => {
    const { name } = req.body
    
    if (!name) {
        return res.status(400).json({ error: 'name is mandatory' })
    }

    const sql = 'INSERT INTO meter (name) VALUES (?)'

    db.run(sql, [name], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message })
        }

        res.status(201).json({
            message: 'Meter created',
        })
    })
})

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM meter'

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }

        res.status(200).json(rows)
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    const sql = 'SELECT * FROM meter WHERE id = ?'

    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }

        if (!row) {
            return res.status(404).json({ error: 'Meter not found' })
        }

        res.status(200).json(row)
    })
})

module.exports = router

