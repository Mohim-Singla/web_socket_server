import { service } from '../service/index.js';

/**
 * Middleware to validate if user if part of the group.
 *
 * @async
 * @function checkUserGroupAssociation
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} Calls `next()` on successful user-group association or sends an error response.
 */
export const checkUserGroupAssociation = async (req, res, next) => {
  try {
    const groupId = req.params?.groupId;
    if(!groupId) {
      return res.error('Invalid input.', null, 400, 400);
    }

    const isUserPartOfGroup = await service.userGroup.isUserPartOfGroup(req.user.userId, groupId);
    if(!isUserPartOfGroup) {
      return res.error('Invalid access to group actions.', null, 403, 403);
    }

    next();
  } catch (error) {
    return res.error('Something went wrong.', error.message, 500, 500);
  }
};
