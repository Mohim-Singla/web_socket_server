import { mysqlRepository } from '../db/mysql/repository/index.js';
import { utils } from '../utils/index.js';

/**
 * Fetches groups of a specific type from the MySQL repository using Sequelize.
 * This function constructs a query condition based on the provided group type and
 * uses the repository to fetch all groups matching that condition.
 * @async
 * @function fetchGroupsWithType
 * @memberof module:group
 * @param {string} type - The type of groups to fetch (e.g., 'PUBLIC').
 * @returns {Promise<Array>} A promise that resolves to an array of groups matching the specified type.
 * @throws {Error} If there is an issue fetching the groups from the repository.
 */
async function fetchGroupsWithType(type) {
  const condition = {
    where: { type },
  };

  return mysqlRepository.groups.fetchAll(condition);
}

/**
 * Fetches group details by its ID.
 * @async
 * @function
 * @param {string} groupId - The ID of the group to fetch.
 * @returns {Promise<Object|null>} The group details or null if not found.
 */
async function fetchGroupWithId(groupId) {
  const condition = {
    where: { groupId },
  };

  return mysqlRepository.groups.fetchOne(condition);
}

/**
 * @async
 * @function fetchGroupsData
 * @memberof module:group
 * Fetches group data based on group IDs and type.
 * @param {Array<number|string>} groupIds - An array of group IDs to fetch the data for.
 * @param {string} type - The type of the groups to filter by.
 * @returns {Promise<Array>} A promise that resolves to an array of group data.
 * @throws {Error} Throws an error if the database query fails.
 */
async function fetchGroupsData(groupIds, type) {
  const condition = {
    where: {
      groupId: groupIds,
      type,
    },
  };

  return mysqlRepository.groups.fetchAll(condition);
}

/**
 * Creates a new group in the MySQL database using Sequelize.
 * This function prepares the group data, including generating a new `groupId` using a utility function,
 * and calls the repository method to insert the group into the database.
 * @async
 * @function create
 * @memberof module:group
 * @param {Object} params - The parameters for the new group.
 * @param {string} params.title - The title of the group.
 * @param {string} [params.description] - The description of the group (optional).
 * @param {string} params.type - The type of the group (e.g., 'PUBLIC', 'PRIVATE').
 * @param {string} params.createdBy - The user ID of the creator of the group.
 * @param {object} [transaction] - An optional transaction object for managing the operation within a transaction.
 * @returns {Promise<Object>} Resolves with the created group record.
 * @throws {Error} If there is an issue creating the group in the database.
 */
async function create(params, transaction = null) {
  const groupData = {
    groupId: utils.common.createUuid(),
    title: params.title,
    description: params.description ?? null,
    type: params.type,
    createdBy: params.createdBy,
  };
  return mysqlRepository.groups.create(groupData, transaction);
}

export const group = {
  create,
  fetchGroupsData,
  fetchGroupWithId,
  fetchGroupsWithType,
};
