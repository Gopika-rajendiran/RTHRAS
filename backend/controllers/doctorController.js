const db = require('../config/db');
const { getIO } = require('../socket');

exports.getDoctors = (req, res) => {
    db.all("SELECT * FROM doctors", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Database error", error: err.message });
        }
        res.json({ success: true, data: rows });
    });
};

exports.addDoctor = (req, res) => {
    const { name, department, status, queue_count } = req.body;
    
    if (!name || !department || !status) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const queue = queue_count || 0;
    
    db.run(
        "INSERT INTO doctors (name, department, status, queue_count) VALUES (?, ?, ?, ?)",
        [name, department, status, queue],
        function(err) {
            if (err) {
                return res.status(500).json({ success: false, message: "Database error", error: err.message });
            }
            getIO().emit('doctorsUpdated');
            res.json({ success: true, message: "Doctor added successfully", id: this.lastID });
        }
    );
};

exports.updateDoctor = (req, res) => {
    const { id } = req.params;
    const { name, department, status, queue_count } = req.body;
    
    if (!name || !department || !status) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const queue = queue_count || 0;

    db.run(
        "UPDATE doctors SET name = ?, department = ?, status = ?, queue_count = ? WHERE id = ?",
        [name, department, status, queue, id],
        function(err) {
            if (err) {
                return res.status(500).json({ success: false, message: "Database error", error: err.message });
            }
            getIO().emit('doctorsUpdated');
            res.json({ success: true, message: "Doctor updated successfully" });
        }
    );
};
