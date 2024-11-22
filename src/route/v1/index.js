/**
 * Express router for API version 1.
 * @module v1
 */

import express from 'express';
import { auth } from './auth.js';
import { groups } from './groups.js';

const router = new express.Router();

/**
 * Use authentication-related routes.
 * @summary Mounts the authentication routes under `/auth`.
 * @description This middleware integrates the authentication routes defined in the `auth.js` module.
 */
router.use('/auth', auth);
router.use('/groups', groups);

export const v1 = router;
