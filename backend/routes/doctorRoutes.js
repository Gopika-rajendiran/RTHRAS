const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.get('/', doctorController.getDoctors);
router.post('/add', doctorController.addDoctor);
router.put('/update/:id', doctorController.updateDoctor);

module.exports = router;
