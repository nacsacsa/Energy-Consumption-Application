const db = require('../database/database');

exports.reading_get_all = (req, res) => {
    const sql = 'SELECT * FROM meter_reading';

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
}

exports.reading_get_by_id = (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid id' });
    }

    const sql = 'SELECT * FROM meter_reading WHERE id = ?';

    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!row) {
            return res.status(404).json({ error: 'Meter reading not found' });
        }

        res.status(200).json(row);
    });
}

exports.reading_create = (req, res) => {
    const { meter_id, reading, timestamp } = req.body;

    if (!meter_id || reading === undefined) {
        return res.status(400).json({ error: 'meter_id and reading are mandatory' });
    }

    const time = timestamp ? new Date(timestamp).toISOString() : new Date().toISOString();

    const sql = `
        INSERT INTO meter_reading (timestamp, meter_id, reading)
        VALUES (?, ?, ?)
    `;

    db.run(sql, [time, meter_id, reading], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            id: this.lastID,
            meter_id,
            reading,
            timestamp: time
        });
    });
}

exports.reading_update = (req, res) => {
    const { id } = req.params;
    const { meter_id, reading, timestamp } = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid id' });
    }

    if (!meter_id || reading === undefined) {
        return res.status(400).json({ error: 'meter_id and reading are mandatory' });
    }

    const time = timestamp ? new Date(timestamp).toISOString() : new Date().toISOString();

    const sql = `
        UPDATE meter_reading
        SET meter_id = ?, reading = ?, timestamp = ?
        WHERE id = ?
    `;

    db.run(sql, [meter_id, reading, time, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Meter reading not found' });
        }

        res.status(200).json({
            id: Number(id),
            meter_id,
            reading,
            timestamp: time
        });
    });
}

exports.reading_delete = (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid id' });
    }

    const sql = 'DELETE FROM meter_reading WHERE id = ?';

    db.run(sql, [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Meter reading not found' });
        }

        res.status(200).json({
            message: `Meter reading ${id} deleted`
        });
    });
}