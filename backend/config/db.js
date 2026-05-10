const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../database/hospital.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        
        db.serialize(() => {
            // Create tables
            db.run(`CREATE TABLE IF NOT EXISTS doctors (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                department TEXT,
                status TEXT,
                queue_count INTEGER DEFAULT 0
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS blood_stock (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                blood_group TEXT NOT NULL UNIQUE,
                status TEXT,
                units INTEGER DEFAULT 0
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS emergency_status (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                icu_status TEXT,
                trauma_status TEXT,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`);

            // Insert sample data (using INSERT OR IGNORE or checking existence to prevent duplicates)
            
            // Doctors
            db.get("SELECT COUNT(*) AS count FROM doctors", (err, row) => {
                if (row.count === 0) {
                    const insertDoctor = db.prepare("INSERT INTO doctors (name, department, status, queue_count) VALUES (?, ?, ?, ?)");
                    insertDoctor.run("Dr. Kumar", "Cardiology", "Available", 0);
                    insertDoctor.run("Dr. Priya", "Neurology", "Available", 0);
                    insertDoctor.finalize();
                    console.log("Sample doctors inserted.");
                }
            });

            // Blood Stock
            db.get("SELECT COUNT(*) AS count FROM blood_stock", (err, row) => {
                if (row.count === 0) {
                    const insertBlood = db.prepare("INSERT INTO blood_stock (blood_group, status, units) VALUES (?, ?, ?)");
                    insertBlood.run("A+", "Available", 10);
                    insertBlood.run("O-", "Low", 2);
                    insertBlood.run("B+", "Available", 5);
                    insertBlood.finalize();
                    console.log("Sample blood stock inserted.");
                }
            });

            // Emergency Status
            db.get("SELECT COUNT(*) AS count FROM emergency_status", (err, row) => {
                if (row.count === 0) {
                    db.run("INSERT INTO emergency_status (icu_status, trauma_status) VALUES (?, ?)", ["ICU Available", "Trauma Ready"]);
                    console.log("Sample emergency status inserted.");
                }
            });
        });
    }
});

module.exports = db;
