const express = require('express');
const router = express.Router();
const consumptionController = require('../controllers/consumption');

router.get('/', consumptionController.consumption_get_from_to);

module.exports = router;
