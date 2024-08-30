const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const { initializeSocket } = require('./sockets/socket');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection (without deprecated options)
mongoose.connect('mongodb://localhost:27017/tictactoe', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use authentication routes
app.use('/api/auth', authRoutes);

// Use event routes
app.use('/api/events', eventRoutes);

// Initialize Socket.IO
initializeSocket(io);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server on a different port if 4000 is in use
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
