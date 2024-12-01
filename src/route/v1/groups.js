/**
 * Express router for handling groups-related endpoints.
 * @module groups
 */

import express from 'express';
import { controller } from '../../controller/index.js';
import { authenticate } from '../../middleware/authenticate.js';
import { validateRequest } from '../../middleware/requestValidator.js';
import { JoiSchemas } from '../../apiValidations/index.js';
import { checkUserGroupAssociation } from '../../middleware/checkUserGroupAssociation.js';

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
 * Handles the route to join a public group by its ID.
 * Validates the user's access and associates them with the group.
 * @name POST /:groupId/public/join
 * @function
 * @memberof module:groups
 * @param {Object} req - The Express request object.
 * @param {Object} req.params - The route parameters.
 * @param {string} req.params.groupId - The ID of the group to join.
 * @param {Object} res - The Express response object to send the result.
 * @returns {Promise<void>} Responds with success or error message.
 */
router.post('/:groupId/public/join', authenticate, controller.groups.joinGroup);

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

/**
 * Fetches messages for a specific group.
 * This route is protected by authentication middleware.
 * @name GET /:groupId/messages
 * @function
 * @memberof module:groups
 * @param {express.Request} req - The Express request object containing:
 * @param {object} req.params - The route parameters.
 * @param {string} req.params.groupId - The ID of the group whose messages are being fetched.
 * @param {object} req.query - The query parameters for pagination.
 * @param {number|string} [req.query.limit=50] - The maximum number of messages to retrieve (optional).
 * @param {number|string} [req.query.offset=0] - The number of messages to skip (optional).
 * @param {express.Response} res - The Express response object to send the result.
 * @param {express.NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} Sends a success response with the fetched messages.
 * @returns {Array<object>} res.body - An array of message objects sorted by timestamp.
 * @throws {Error} If the user is not authorized to access the group or if message retrieval fails.
 */
router.get('/:groupId/messages', authenticate, checkUserGroupAssociation, controller.groups.fetchGroupMessages);

/**
 * Route to add members to a group.
 *
 * @name POST /:groupId/add/members
 * @function
 * @memberof module:groups
 * @param {string} groupId - The ID of the group to which members will be added.
 * @param {Function} controller.groups.addGroupMembers - Controller function to handle the request.
 * @description
 * Adds one or more members to the specified group. The `authenticate` middleware ensures the user is authenticated.
 */
router.post('/:groupId/add/members', authenticate, validateRequest(JoiSchemas.groupsSchema.addGroupMembers.body), checkUserGroupAssociation, controller.groups.addGroupMembers);

export const groups = router;
