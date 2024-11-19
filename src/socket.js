import { Server } from 'socket.io';

export const socketConnection = {
    /**
     * Initializes the WebSocket server.
     * @param {import('http').Server} server - The HTTP server to attach Socket.IO to.
     * @returns {Server} - The Socket.IO server instance.
     */
    initialize: (server) => {
        const io = new Server(server);    
        io.on('connection', (socket) => {
            console.log('A user connected');

            socket.on('disconnect', () => {
                console.log('User disconnected');
            });
    
            socket.on('message', (msg) => {
                console.log('message')
                io.emit('message', msg);
            });
        });
    
        return io;
    },
};
