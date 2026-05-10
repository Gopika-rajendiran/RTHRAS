const db = require('../config/db');
const { getIO } = require('../socket');

exports.getBloodStock = (req, res) => {
    db.all("SELECT * FROM blood_stock", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Database error", error: err.message });
        }
        res.json({ success: true, data: rows });
    });
};

exports.addBloodStock = (req, res) => {
    const { blood_group, status, units } = req.body;
    
    if (!blood_group || !status) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const unitsCount = units || 0;
    
    db.run(
        "INSERT INTO blood_stock (blood_group, status, units) VALUES (?, ?, ?)",
        [blood_group, status, unitsCount],
        function(err) {
            if (err) {
                return res.status(500).json({ success: false, message: "Database error", error: err.message });
            }
            getIO().emit('bloodUpdated');
            res.json({ success: true, message: "Blood stock added successfully", id: this.lastID });
        }
    );
};

exports.updateBloodStock = (req, res) => {
    const { id } = req.params;
    const { blood_group, status, units } = req.body;
    
    if (!blood_group || !status) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const unitsCount = units || 0;

    db.run(
        "UPDATE blood_stock SET blood_group = ?, status = ?, units = ? WHERE id = ?",
        [blood_group, status, unitsCount, id],
        function(err) {
            if (err) {
                return res.status(500).json({ success: false, message: "Database error", error: err.message });
            }
            getIO().emit('bloodUpdated');
            res.json({ success: true, message: "Blood stock updated successfully" });
        }
    );
};
