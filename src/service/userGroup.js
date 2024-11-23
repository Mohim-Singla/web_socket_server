import { mongoRepository } from '../db/mongo/repository/mongo/index.js';

async function createUsersAssociationWithGroup(users, groupId) {
  const usersGroupData = users.map((user) => {
    return {
      userId: user,
      groupId,
      isEnabled: true,
    };
  });

  return mongoRepository.userGroups.bulkCreate(usersGroupData);
}

export const userGroup = {
  createUsersAssociationWithGroup,
};
