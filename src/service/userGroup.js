import { mysqlRepository } from '../db/mysql/repository/index.js';

/**
 * Creates or updates associations between multiple users and a group in the database.
 *
 * @async
 * @function createUsersAssociationWithGroup
 * @param {Array<string>} users - An array of user IDs to associate with the group.
 * @param {string} groupId - The ID of the group to associate the users with.
 * @param {object} [transaction] - An optional Sequelize transaction object for atomic operations.
 * @returns {Promise<Array>} Resolves to an array of results from the bulk create and update operations.
 *
 * @description
 * - For users not already associated with the group, new association records are created with `isEnabled: true`.
 * - For users already associated with the group, their `isEnabled` status is updated to `true`.
 * - Performs a bulk insert for new associations and a bulk update for existing ones within a transaction if provided.
 *
 * @example
 * const associations = await createUsersAssociationWithGroup(
 *   ['user1', 'user2', 'user3'],
 *   'group123',
 *   transaction
 * );
 * console.log(associations);
 */
async function createUsersAssociationWithGroup(users, groupId, transaction) {
  const existingUserGroupsAssociation = await mysqlRepository.userGroups.fetchAll({ where: { userId: users, groupId } });

  const existingUserIds = Array.from(new Set(existingUserGroupsAssociation.map(assoc => assoc.userId)));
  const nonExistingUserIds = Array.from(new Set(users.filter(userId => !existingUserIds.includes(userId))));

  const newUsersGroupData = nonExistingUserIds.map((user) => {
    return {
      userId: user,
      groupId,
      isEnabled: true,
    };
  });

  const promises = [];
  if (newUsersGroupData.length) {
    promises.push(mysqlRepository.userGroups.bulkCreate(newUsersGroupData, transaction));
  }
  if (existingUserIds.length) {
    promises.push(mysqlRepository.userGroups.update({ isEnabled: true }, { where: { userId: existingUserIds, groupId }, transaction }));
  }
  return Promise.all(promises);
}

/**
 * Fetches the groups associated with a given user.
 * @param {number|string} userId - The ID of the user whose groups are to be fetched.
 * @returns {Promise<Array>} A promise that resolves to an array of user groups.
 * @throws {Error} Throws an error if the database query fails.
 */
async function fetchUserGroups(userId) {
  const options = {
    where: {
      userId,
      isEnabled: true,
    },
  };
  return mysqlRepository.userGroups.fetchAll(options);
}

/**
 * Checks if a user is part of a specific group in the MySQL database.
 * This function uses Sequelize to query the userGroups table to determine if a record exists
 * matching the provided `userId` and `groupId`.
 * @async
 * @function isUserPartOfGroup
 * @param {number|string} userId - The ID of the user to check.
 * @param {number|string} groupId - The ID of the group to check.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the user is part of the group,
 *                              and `false` otherwise.
 * @throws {Error} If there is an issue checking the user's group membership.
 */
async function isUserPartOfGroup(userId, groupId) {
  const options = {
    where: {
      userId,
      groupId,
    },
  };
  const userGroupData = await mysqlRepository.userGroups.fetchOne(options);

  return !!userGroupData;
}

export const userGroup = {
  createUsersAssociationWithGroup,
  fetchUserGroups,
  isUserPartOfGroup,
};
