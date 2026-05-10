const db = require('../config/db');
const { getIO } = require('../socket');

exports.getEmergencyStatus = (req, res) => {
    db.get("SELECT * FROM emergency_status ORDER BY updated_at DESC LIMIT 1", [], (err, row) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Database error", error: err.message });
        }
        res.json({ success: true, data: row });
    });
};

exports.updateEmergencyStatus = (req, res) => {
    const { icu_status, trauma_status } = req.body;
    
    if (!icu_status || !trauma_status) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    db.run(
        "UPDATE emergency_status SET icu_status = ?, trauma_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1",
        [icu_status, trauma_status],
        function(err) {
            if (err) {
                return res.status(500).json({ success: false, message: "Database error", error: err.message });
            }
            getIO().emit('emergencyUpdated');
            res.json({ success: true, message: "Emergency status updated successfully" });
        }
    );
};
