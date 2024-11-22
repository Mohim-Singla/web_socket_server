import { mongoRepository } from '../repository/mongo/index.js';

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

export const group = {
  fetchGroupsWithType,
};
