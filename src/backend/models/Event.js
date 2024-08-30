const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDate: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isStarted: { type: Boolean, default: false }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
