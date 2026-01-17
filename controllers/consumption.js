const db = require('../database/database');

exports.consumption_get_from_to = (req, res) => {
    const { meter_id, from, to } = req.query;

    if (!meter_id) {
        return res.status(400).json({ error: 'meter_id is required' });
    }

    if (!from || !to) {
        return res.status(400).json({ error: 'from and to are required' });
    }

    const start = new Date(from);
    start.setHours(0, 0, 0, 0);

    const end = new Date(to);
    end.setHours(23, 59, 59, 999);

    const startISO = start.toISOString();
    const endISO = end.toISOString();

    const sqlFrom = `
        SELECT reading
        FROM meter_reading
        WHERE meter_id = ?
          AND timestamp >= ?
        ORDER BY timestamp ASC
        LIMIT 1
    `;

    const sqlTo = `
        SELECT reading
        FROM meter_reading
        WHERE meter_id = ?
          AND timestamp <= ?
        ORDER BY timestamp DESC
        LIMIT 1
    `;

    db.get(sqlFrom, [meter_id, startISO], (err, rowFrom) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!rowFrom) {
            return res.status(404).json({ error: 'No readings found for start date' });
        }

        db.get(sqlTo, [meter_id, endISO], (err, rowTo) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (!rowTo) {
                return res.status(404).json({ error: 'No readings found for end date' });
            }

            const consumption = rowTo.reading - rowFrom.reading;

            res.status(200).json(consumption);
        });
    });
}