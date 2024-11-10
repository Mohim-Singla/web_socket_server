import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { routeMap } from './route/index.js';
import { responseHandler } from './middleware/responseHandler.js';
import { debugLogger } from './middleware/debug.js';

const app = express();

const PORT = process.env.PORT || 3000;

/**
 * Main function used for server initialization
 */
async function main () {
    try {
        app.use(express.json({ limit: '60mb', extended: true }));
        app.use(express.urlencoded({ extended: true }));
        app.use(debugLogger);
        app.use(responseHandler);

        app.get('/ping', (req, res) => {
            return res.success('Server is working fine.', { timestamp: Date.now() });
        } )

        app.use('/web-socket', routeMap);
        app.listen(PORT, (error) => {
            if (error) {
                throw error;
            }
            console.info('App is listenting on PORT:', PORT);
        })
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();
