const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergencyController');

router.get('/', emergencyController.getEmergencyStatus);
router.put('/update', emergencyController.updateEmergencyStatus);

module.exports = router;
