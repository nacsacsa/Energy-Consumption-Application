const express = require('express')
const router = express.Router()
const db = require('../database/database')

router.post('/create', (req, res) => {
    const { name } = req.body
    
    if (!name) {
        return res.status(400).json({ error: 'Name is mandatory' })
    }

    const sql = 'INSERT INTO meter (name) VALUES (?)'

    db.run(sql, [name], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message })
        }

        res.status(201)
    })
})

router.delete('/delete/', (req, res) => {
    const { id } = req.query

    const sql = 'DELETE FROM meter WHERE id = ?'

    db.run(sql, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message })
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Meter not found' })
        }

        res.status(200)
    })
})

router.put('/modify/', (req, res) => {
    const { id } = req.query
    const { name } = req.body

    if (!name) {
        return res.status(400).json({ error: 'Name is mandatory' })
    }

    const sql = 'UPDATE meter SET name = ? WHERE id = ?'

    db.run(sql, [name, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message })
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Meter not found' })
        }

        res.status(200)
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

router.get('/', (req, res) => {
    const { id } = req.query
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

