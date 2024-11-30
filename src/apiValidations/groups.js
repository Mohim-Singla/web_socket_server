import Joi from 'joi';
import { utils } from '../utils/index.js';

/**
 * @typedef {Object} CreateGroupSchema
 * @property {string} title - The title of the group (required).
 * @property {string} type - The type of the group (required). Must be one of the valid group types.
 * @property {string} [description] - An optional description of the group.
 */

/**
 * Joi schema for validating the request body when creating a group.
 * @type {Object}
 * @property {Joi.ObjectSchema<CreateGroupSchema>} body - The schema for the request body.
 */
const createGroup = {
  body: Joi.object({
    title: Joi.string().required(),
    type: Joi.string().required().valid(...Object.values(utils.constant.GROUPS.TYPES)),
    members: Joi.array().optional().items(Joi.string()),
    description: Joi.string().optional(),
  }),
};

/**
 * Collection of validation schemas for group-related operations.
 * @type {Object}
 * @property {Object} createGroup - Schema for validating the request body for creating a group.
 */
export const groupsSchema = {
  createGroup,
};
