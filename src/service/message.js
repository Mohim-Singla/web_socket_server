import { mongoRepository } from '../db/mongo/repository/index.js';

/**
 * Saves a new message to the database with the provided details.
 * @async
 * @function save
 * @param {object} params - Input parameters for creating a message.
 * @param {string} params.userId - The ID of the user sending the message.
 * @param {string} params.groupId - The ID of the group where the message is being sent.
 * @param {string} params.messageContent - The content of the message being sent.
 * @returns {Promise<object>} The created message record from the database.
 * @example
 * const newMessage = await save({
 *   userId: 'user123',
 *   groupId: 'group456',
 *   messageContent: 'Hello, world!'
 * });
 * console.log(newMessage);
 * @description This function prepares the message data and saves it to the database.
 * It does not include any additional validation or modification of the data before saving.
 */
async function save(params) {
  const messageData = {
    userId: params.userId,
    groupId: params.groupId,
    messageContent: params.messageContent,
  };
  return mongoRepository.messages.create(messageData);
}

/**
 * Fetches records from the database based on the provided `groupId` and additional query parameters.
 * @async
 * @function fetchAllWithGroupId
 * @param {number|string} groupId - The ID of the group to filter by.
 * @param {Object} params - Additional query parameters (e.g., filters, pagination, sorting).
 * @returns {Promise<Array>} A promise that resolves to an array of records matching the `groupId` and query parameters.
 * @throws {Error} If there is an issue fetching the records from the database.
 */
async function fetchAllWithGroupId(groupId, params){
  const { limit, offset } = params;
  const messages = await mongoRepository.messages.fetchAll({ groupId }, null, { limit, skip: offset, sort: { timestamp: -1 } });
  return messages;
}

export const message = {
  save,
  fetchAllWithGroupId,
};
