import { modelMap } from '../../db/mongo/models/index.js';

/**
 * Fetches all groups from the MongoDB database based on the provided filter, projection, and options.
 * This function interacts with the MongoDB model to retrieve groups matching the specified
 * filter conditions, and applies optional projections and query options (e.g., pagination, sorting).
 * @async
 * @function fetchAll
 * @memberof module:groups
 * @param {Object} filter - The filter conditions to match groups (e.g., `{ type: 'PUBLIC' }`).
 * @param {Object} [projection] - The fields to include or exclude in the result (e.g., `{ name: 1 }`).
 * @param {Object} [options] - Additional query options, such as pagination or sorting.
 * @returns {Promise<Array>} A promise that resolves to an array of groups matching the filter.
 * @throws {Error} If there is an issue fetching the groups from the database.
 */
async function fetchAll(filter, projection, options) {
  return modelMap.groupsModel.getModel().find(filter, projection, options);
}

export const groups = {
  fetchAll,
};
