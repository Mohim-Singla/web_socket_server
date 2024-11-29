/**
 * Express router for handling groups-related endpoints.
 * @module groups
 */

import express from 'express';
import { controller } from '../../controller/index.js';
import { authenticate } from '../../middleware/authenticate.js';
import { validateRequest } from '../../middleware/requestValidator.js';
import { JoiSchemas } from '../../apiValidations/index.js';

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

/**
 * Endpoint to fetch all private groups.
 * This route is protected by authentication middleware.
 * It retrieves a list of private groups from the database.
 * @name GET /groups/private
 * @function
 * @memberof module:groups
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next middleware function.
 * @returns {Promise<void>} Resolves with the list of private groups.
 * @throws {Error} If there is an issue fetching the groups from the database.
 */
router.get('/private', authenticate, controller.groups.fetchPrivateGroups);

/**
 * Endpoint to create a new group.
 * This route is protected by authentication middleware.
 * It validates the request body against the schema, then creates a new group in the database.
 * @name POST /groups/create
 * @function
 * @memberof module:groups
 * @param {express.Request} req - The Express request object, containing group details in the body.
 * @param {express.Response} res - The Express response object, used to return the created group details.
 * @param {express.NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} Resolves with a success response containing the created group.
 * @throws {Error} If the request body validation fails or the group creation fails.
 */
router.post('/create', authenticate, validateRequest(JoiSchemas.groupsSchema.createGroup.body), controller.groups.createGroup);

export const groups = router;
