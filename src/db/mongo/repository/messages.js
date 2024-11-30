import { modelMap } from '../models/index.js';

/**
 * Fetches all messages from the MongoDB database based on the provided filter, projection, and options.
 * This function interacts with the MongoDB model to retrieve messages matching the specified
 * filter conditions, and applies optional projections and query options (e.g., pagination, sorting).
 * @async
 * @function fetchAll
 * @memberof module:messages
 * @param {Object} filter - The filter conditions to match messages.
 * @param {Object} [projection] - The fields to include or exclude in the result.
 * @param {Object} [options] - Additional query options, such as pagination or sorting.
 * @returns {Promise<Array>} A promise that resolves to an array of messages matching the filter.
 * @throws {Error} If there is an issue fetching the messages from the database.
 */
async function fetchAll(filter, projection, options) {
  return modelMap.messagesModel.getModel().find(filter, projection, options);
}

/**
 * Creates a new message in the MongoDB database.
 * This function interacts with the MongoDB model to insert a new message document into the database.
 * @async
 * @function create
 * @memberof module:messages
 * @param {Object} messageData - The data for the new message.
 * @returns {Promise<Object>} A promise that resolves to the created message document.
 * @throws {Error} If there is an issue creating the message in the database.
 */
async function create(messageData) {
  return modelMap.messagesModel.getModel().create(messageData);
}

/**
 * Module containing database operations for messages.
 * @module messages
 */
export const messages = {
  create,
  fetchAll,
};
