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

export const userGroup = {
  createUsersAssociationWithGroup,
  fetchUserGroups,
};
