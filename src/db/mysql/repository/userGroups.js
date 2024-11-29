import { modelMap } from '../models/index.js';

/**
 * Performs a bulk insert of user-group data into the MySQL database using Sequelize.
 * This function interacts with the Sequelize model to insert multiple records in a single operation.
 * @async
 * @function bulkCreate
 * @memberof module:userGroups
 * @param {Array<Object>} usersGroupData - An array of objects containing user-group data
 * (e.g., `[ { userId: 1, groupId: 2 }, { userId: 3, groupId: 4 } ]`).
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of the created records.
 * @throws {Error} If there is an issue performing the bulk insert in the database.
 */
async function bulkCreate(usersGroupData) {
  return modelMap.userGroupsModel.getModel().bulkCreate(usersGroupData);
}

/**
 * Module containing database operations for user-group relations.
 * @module userGroups
 */
export const userGroups = {
  bulkCreate,
};
