const Event = require('../models/Event');
const User = require('../models/User');

const createEvent = async (req, res) => {
  const { eventName, eventDate, createdBy } = req.body;
  if (!eventName || !eventDate || !createdBy) {
    return res.status(400).json({ error: 'Event name, date, and creator are required' });
  }

  try {
    // Ensure createdBy is a valid user ID
    const user = await User.findOne({ username: createdBy });
    if (!user) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const newEvent = new Event({
      eventName,
      eventDate,
      createdBy: user._id
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);  // Log the error for debugging
    res.status(500).json({ error: 'Server error' });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'username');
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);  // Log the error for debugging
    res.status(500).json({ error: 'Server error' });
  }
};

const startEvent = async (req, res) => {
  const eventId = req.params.id;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    event.isStarted = true;
    await event.save();
    res.json(event);
  } catch (error) {
    console.error('Error starting event:', error);  // Log the error for debugging
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteEvent = async (req, res) => {
  const eventId = req.params.id;
  try {
    await Event.findByIdAndDelete(eventId);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting event:', error);  // Log the error for debugging
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createEvent,
  getEvents,
  startEvent,
  deleteEvent
};
