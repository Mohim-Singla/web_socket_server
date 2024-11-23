import { modelMap } from '../../models/index.js';

async function bulkCreate(usersGroupData) {
  return modelMap.userGroupsModel.getModel().insertMany(usersGroupData);
}

/**
 * Module containing database operations for groups.
 * @module groups
 */
export const userGroups = {
  bulkCreate,
};
