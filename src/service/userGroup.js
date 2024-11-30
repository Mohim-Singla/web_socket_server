import { mysqlRepository } from '../db/mysql/repository/index.js';

/**
 * Creates associations between multiple users and a group in the database.
 * This function generates the association data and uses the repository to perform a bulk insert.
 *
 * @async
 * @function createUsersAssociationWithGroup
 * @param {Array<string>} users - An array of user IDs to associate with the group.
 * @param {string} groupId - The ID of the group to associate the users with.
 * @param {object} [transaction] - An optional transaction object for managing the operation within a transaction.
 * @returns {Promise<Array<object>>} Resolves to an array of created association records.
 * @example
 * const associations = await userGroup.createUsersAssociationWithGroup(
 *   ['user1', 'user2', 'user3'],
 *   'group123'
 * );
 * console.log(associations);
 *
 * @description This function maps each user ID to the specified group ID and enables the association by default.
 * It then performs a bulk insert of these associations into the database.
 */
async function createUsersAssociationWithGroup(users, groupId, transaction) {
  const usersGroupData = users.map((user) => {
    return {
      userId: user,
      groupId,
      isEnabled: true,
    };
  });

  return mysqlRepository.userGroups.bulkCreate(usersGroupData, transaction);
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
