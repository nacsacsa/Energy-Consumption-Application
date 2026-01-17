const express = require('express');
const router = express.Router();
const meterController = require('../controllers/meter');


router.get('/', meterController.meter_get_all);

router.get('/:id', meterController.meter_get_by_id);

router.post('/', meterController.meter_create);

router.put('/:id', meterController.meter_update);

router.delete('/:id', meterController.meter_delete);

module.exports = router;
