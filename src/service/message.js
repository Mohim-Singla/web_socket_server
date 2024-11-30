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

export const message = {
  save,
};
