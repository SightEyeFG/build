const express = require('express');
const { createEvent, getEvents, startEvent, deleteEvent } = require('../controllers/eventController');
const router = express.Router();

router.post('/', createEvent);
router.get('/', getEvents);
router.put('/:id/start', startEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
