/**
 * Express router for handling groups-related endpoints.
 * @module groups
 */

import express from 'express';
import { controller } from '../../controller/index.js';
import { authenticate } from '../../middleware/authenticate.js';

const router = new express.Router();

/**
 * Endpoint to fetch all public groups.
 * This route is protected by authentication middleware.
 * It retrieves a list of public groups from the database.
 * @name GET /groups/public
 * @function
 * @memberof module:groups
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next middleware function.
 * @returns {Promise<void>} Resolves with the list of public groups.
 * @throws {Error} If there is an issue fetching the groups from the database.
 */
router.get('/public', authenticate, controller.groups.fetchPublicGroups);

export const groups = router;
