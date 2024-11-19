import { serviceConfig } from './config/index.js';
serviceConfig;
import express from 'express';
import http from 'http';
import { socketConnection } from './socket.js';
import { routeMap } from './route/index.js';
import { responseHandler } from './middleware/responseHandler.js';
import { debugLogger } from './middleware/debug.js';
import { mongoConnection } from './db/mongo/connection/index.js';

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

async function main() {
  try {
    app.use(express.json({ limit: '60mb', extended: true }));
    app.use(express.urlencoded({ extended: true }));
    app.use(debugLogger);
    app.use(responseHandler);

    await mongoConnection.init();

    // Initialize WebSocket
    socketConnection.initialize(server);

    app.get('/ping', (req, res) => {
      return res.success('Server is working fine.', { timestamp: Date.now() });
    });

    app.use('/web-socket', routeMap);

    server.listen(PORT, (error) => {
      if (error) {
        throw error;
      }
      console.info('App is listening on PORT:', PORT);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
