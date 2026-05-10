const express = require('express');
const router = express.Router();
const bloodController = require('../controllers/bloodController');

router.get('/', bloodController.getBloodStock);
router.post('/add', bloodController.addBloodStock);
router.put('/update/:id', bloodController.updateBloodStock);

module.exports = router;
