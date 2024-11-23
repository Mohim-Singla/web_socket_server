import { mongoRepository } from '../repository/mongo/index.js';
import { utils } from '../utils/index.js';

/**
 * Fetches groups of a specific type from the MongoDB repository.
 * This function constructs a condition based on the provided group type and
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
    type,
  };

  return mongoRepository.groups.fetchAll(condition);
}

/**
 * Creates a new group in the database.
 * This function prepares the group data, including generating a new `groupId` using a utility function.
 * It then calls the repository method to insert the group into the database.
 * @async
 * @function create
 * @memberof module:groups
 * @param {Object} params - The parameters for the new group.
 * @param {string} params.title - The title of the group.
 * @param {string} [params.description] - The description of the group (optional).
 * @param {string} params.type - The type of the group (e.g., 'PUBLIC', 'PRIVATE').
 * @param {string} params.createdBy - The user ID of the creator of the group.
 * @param {Array<string>} [params.members] - An array of user IDs who are members of the group (optional, defaults to an empty array).
 * @returns {Promise<Object>} Resolves with the created group document.
 * @throws {Error} If there is an issue creating the group in the database.
 */
async function create(params) {
  const groupData = {
    groupId: utils.common.createUuid(),
    title: params.title,
    description: params.description ?? null,
    type: params.type,
    createdBy: params.createdBy,
    members: params.members ?? [],
  };
  return mongoRepository.groups.create(groupData);
}

export const group = {
  create,
  fetchGroupsWithType,
};
