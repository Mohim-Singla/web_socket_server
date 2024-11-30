import { Server } from 'socket.io';
import { authenticate } from './middleware/authenticate.js';
import { service } from './service/index.js';

export const socketConnection = {
  /**
     * Initializes the WebSocket server.
     * @param {import('http').Server} server - The HTTP server to attach Socket.IO to.
     * @returns {Server} - The Socket.IO server instance.
     */
  initialize: (server) => {
    const io = new Server(server);
    io.use(async (socket, next) => {
      authenticate(socket, null, next);
    });
    io.on('connection', async (socket) => {
      console.log('A user connected');
      const groups = await service.userGroup.fetchUserGroups(socket.user.userId);
      groups.forEach((group) => {
        socket.join(`group_${group.groupId}`);
        console.log(`User ${socket.user.userId} joined group_${group.groupId}`);
      });
      socket.on('disconnect', () => {
        console.log('User disconnected');
      });

      socket.on('group_message', async ({ groupId, message }) => {
        const groupRoom = `group_${groupId}`;
        if (socket.rooms.has(groupRoom)) {
          await service.message.save({ userId: socket.user.userId, groupId, messageContent: message });
          io.to(groupRoom).emit('group_message', {
            groupId,
            sender: socket.user.userId,
            message,
          });
        } else {
          socket.emit('error', 'You are not part of this group.');
        }
      });
    });

    return io;
  },
};
