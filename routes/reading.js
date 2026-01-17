const express = require('express');
const router = express.Router();
const readingController = require('../controllers/reading');

router.get('/', readingController.reading_get_all);

router.get('/:id', readingController.reading_get_by_id);

router.post('/', readingController.reading_create);

router.put('/:id', readingController.reading_update);

router.delete('/:id', readingController.reading_delete);

module.exports = router;
