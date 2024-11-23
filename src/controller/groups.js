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

/**
 * Creates a new group.
 * This function validates the request body, then interacts with the service layer to
 * create a new group. It includes the current user as the creator and initial member.
 * @async
 * @function createGroup
 * @memberof module:groups
 * @param {express.Request} req - The Express request object, expected to include user details and group data.
 * @param {express.Response} res - The Express response object.
 * @returns {Promise<void>} Resolves with a success response containing the created group details.
 * @throws {Error} Sends an error response if the group creation fails.
 */
async function createGroup(req, res) {
  try {
    const newGroup = await service.group.create({
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      createdBy: req.user.userId,
      members: [req.user.userId],
    });
    return res.success('Group created successfully.', newGroup, 201);
  } catch (error) {
    console.error('Unable to create new group.', error);
    return res.error('Something went wrong.', error.message, 500, 500);
  }
}

/**
 * Module containing group-related controller functions.
 * @module groups
 */
export const groups = {
  createGroup,
  fetchPublicGroups,
};