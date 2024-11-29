import { mysqlRepository } from '../db/mysql/repository/index.js';

/**
 * Creates associations between multiple users and a group in the database.
 * This function generates the association data and uses the repository to perform a bulk insert.
 * @async
 * @function createUsersAssociationWithGroup
 * @param {Array<string>} users - An array of user IDs to associate with the group.
 * @param {string} groupId - The ID of the group to associate the users with.
 * @returns {Promise<Array<object>>} Resolves to an array of created association records.
 * @example
 * const associations = await userGroup.createUsersAssociationWithGroup(
 *   ['user1', 'user2', 'user3'],
 *   'group123'
 * );
 * console.log(associations);
 * @description This function maps each user ID to the specified group ID and enables the association by default.
 * It then performs a bulk insert of these associations into the database.
 */
async function createUsersAssociationWithGroup(users, groupId) {
  const usersGroupData = users.map((user) => {
    return {
      userId: user,
      groupId,
      isEnabled: true,
    };
  });

  return mysqlRepository.userGroups.bulkCreate(usersGroupData);
}

export const userGroup = {
  createUsersAssociationWithGroup,
};
