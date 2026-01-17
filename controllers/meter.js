const db = require('../database/database');

exports.meter_get_all = (req, res) => {
    const sql = 'SELECT * FROM meter';

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
}

exports.meter_get_by_id = (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid id' });
    }

    const sql = 'SELECT * FROM meter WHERE id = ?';

    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!row) {
            return res.status(404).json({ error: 'Meter not found' });
        }

        res.status(200).json(row);
    });
}

exports.meter_create = (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is mandatory' });
    }

    const sql = 'INSERT INTO meter (name) VALUES (?)';

    db.run(sql, [name], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            id: this.lastID,
            name
        });
    });
}

exports.meter_update = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid id' });
    }

    if (!name) {
        return res.status(400).json({ error: 'Name is mandatory' });
    }

    const sql = 'UPDATE meter SET name = ? WHERE id = ?';

    db.run(sql, [name, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Meter not found' });
        }

        res.status(200).json({
            id: Number(id),
            name
        });
    });
}

exports.meter_delete = (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid id' });
    }

    const sql = 'DELETE FROM meter WHERE id = ?';

    db.run(sql, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Meter not found' });
        }

        res.status(200).json({
            message: `Meter ${id} deleted`
        });
    });
}