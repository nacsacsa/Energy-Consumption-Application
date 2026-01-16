const sqlite3 = require('sqlite3').verbose()
const path = require('path')

const dbPath = path.join(__dirname, '../energy.db')

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.log(err.message)
    }
    else {
        console.log('database is open')
    }
})

db.run('PRAGMA foreign_keys = ON')

db.run('CREATE TABLE IF NOT EXISTS meter(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)')

db.run('CREATE TABLE IF NOT EXISTS meter_reading (id INTEGER PRIMARY KEY AUTOINCREMENT, timestamp DATETIME NOT NULL, reading INTEGER NOT NULL, meter_id INTEGER NOT NULL, FOREIGN KEY (meter_id) REFERENCES meter(id) ON DELETE CASCADE)')

module.exports = db
