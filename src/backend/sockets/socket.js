let io;

const initializeSocket = (socketIoInstance) => {
  io = socketIoInstance;

  io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

module.exports = {
  initializeSocket
};
