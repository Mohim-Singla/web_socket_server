/**
 * Express router for authentication-related endpoints.
 * @module auth
 */

import express from 'express';
import { JoiSchemas } from '../../apiValidations/index.js';
import { validateRequest } from '../../middleware/requestValidator.js';
import { controller } from '../../controller/index.js';
import { authenticate } from '../../middleware/authenticate.js';

const router = new express.Router();

/**
 * GET Validate token
 * @summary Validates user authentication token
 */
router.get('/validate-token' , authenticate, controller.auth.returnSuccess);

/**
 * POST /signup
 * @summary Handles user signup requests.
 * @description This endpoint validates the request body against the Joi schema and processes user signup.
 */
router.post('/signup', validateRequest(JoiSchemas.authSchema.signup.body), controller.auth.signup);
/**
 * POST /login
 * @summary Handles user login requests.
 * @description This endpoint validates the request body against the Joi schema and processes user login.
 */
router.post('/login', validateRequest(JoiSchemas.authSchema.login.body), controller.auth.login);

export const auth = router;
