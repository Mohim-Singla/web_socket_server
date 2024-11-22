import { service } from '../service/index.js';
import { utils } from '../utils/index.js';

/**
 * Fetches a list of public groups from the service layer.
 * This function interacts with the service layer to retrieve groups of the "PUBLIC" type
 * and returns the data in a successful response. If an error occurs during the fetch,
 * it logs the error to the console.
 * @async
 * @function fetchPublicGroups
 * @memberof module:groups
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>} Resolves with a success response containing the list of public groups.
 * @throws {Error} If there is an issue fetching the public groups from the service.
 */
async function fetchPublicGroups(req, res) {
  try {
    const publicGroupData = await service.group.fetchGroupsWithType(utils.constant.GROUPS.TYPES.PUBLIC);

    return res.success('Public groups fetched successfully.', publicGroupData, 200, 200);
  } catch (error) {
    console.error('Failed to fetch public groups data.', error);
  }
}

export const groups = {
  fetchPublicGroups,
};
