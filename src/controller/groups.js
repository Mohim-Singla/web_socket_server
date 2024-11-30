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
 * @param {Express.Request} req - The request object.
 * @param {Express.Response} res - The response object.
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
 * Fetches a list of private groups from the service layer.
 * This function interacts with the service layer to retrieve groups of the "PRIVATE" type
 * and returns the data in a successful response. If an error occurs during the fetch,
 * it logs the error to the console.
 * @async
 * @function fetchPrivateGroups
 * @memberof module:groups
 * @param {Express.Request} req - The request object.
 * @param {Express.Response} res - The response object.
 * @returns {Promise<void>} Resolves with a success response containing the list of private groups.
 * @throws {Error} If there is an issue fetching the private groups from the service.
 */
async function fetchPrivateGroups(req, res) {
  try {
    const userId = req.user.userId;

    const userGroups = await service.userGroup.fetchUserGroups(userId);
    const userGroupIds = userGroups.map((userGroup) => userGroup.groupId);
    const privateGroupData = await service.group.fetchGroupsData(userGroupIds, utils.constant.GROUPS.TYPES.PRIVATE);

    return res.success('Private groups fetched successfully.', privateGroupData, 200, 200);
  } catch (error) {
    console.error('Failed to fetch private groups data.', error);
  }
}

/**
 * Creates a new group.
 * This function validates the request body, then interacts with the service layer to
 * create a new group. It includes the current user as the creator and initial member.
 * @async
 * @function createGroup
 * @memberof module:groups
 * @param {Express.Request} req - The Express request object, expected to include user details and group data.
 * @param {Express.Response} res - The Express response object.
 * @returns {Promise<void>} Resolves with a success response containing the created group details.
 * @throws {Error} Sends an error response if the group creation fails.
 */
async function createGroup(req, res) {
  const transaction = await utils.common.fetchSqlTransactionInstance();
  try {
    const newGroup = await service.group.create({
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      createdBy: req.user.userId,
    }, transaction);

    const users = [req.user.userId, ...(req.body.members ?? [])];
    await service.userGroup.createUsersAssociationWithGroup(users, newGroup.groupId, transaction);

    await utils.common.commitTransaction(transaction);
    return res.success('Group created successfully.', newGroup, 201);
  } catch (error) {
    await utils.common.rollbackTransaction(transaction);
    console.error('Unable to create new group.', error);
    return res.error('Something went wrong.', error.message, 500, 500);
  }
}

/**
 * Fetches messages for a group with pagination.
 * @async
 * @function fetchGroupMessages
 * @param {object} req - The HTTP request object.
 * @param {object} req.params - The route parameters.
 * @param {string} req.params.groupId - The ID of the group to fetch messages for.
 * @param {object} req.query - The query parameters for pagination.
 * @param {number|string} [req.query.limit=50] - The maximum number of messages to retrieve.
 * @param {number|string} [req.query.offset=0] - The number of messages to skip.
 * @param {object} req.user - The authenticated user's data.
 * @param {string} req.user.userId - The ID of the authenticated user.
 * @param {object} res - The HTTP response object.
 * @returns {Promise<object>} Sends a response with the fetched messages or an error message.
 */
async function fetchGroupMessages(req, res) {
  try {
    const { groupId } = req.params;
    const { limit = 50, offset = 0 } = req.query;

    const isUserPartOfGroup = await service.userGroup.isUserPartOfGroup(req.user.userId, groupId);

    if(!isUserPartOfGroup) {
      return res.error('Invalid access to group messages.', null, 403, 403);
    }

    const messages = await service.message.fetchAllWithGroupId(groupId, {
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });

    return res.success('Messages fetched successfully.', messages, 200, 200);
  } catch (error) {
    console.error('Unable to fetch user messages.', error);
    return res.error('Something went wrong.', error.message, 500, 500);
  }
}

/**
 * Module containing group-related controller functions.
 * @module groups
 */
export const groups = {
  createGroup,
  fetchPrivateGroups,
  fetchPublicGroups,
  fetchGroupMessages,
};
