import { Model, DataTypes } from 'sequelize';

const schema = {
  userId: { type: DataTypes.STRING, required: true },
  groupId: { type: DataTypes.STRING, required: true },
  isEnabled: { type: DataTypes.STRING },
};

let model;

export const userGroupsModel = {
  init: async (mysqlConnection) => {
    class userGroups extends Model {}
    model = userGroups.init(schema, { sequelize: mysqlConnection, modelName: 'user_groups' });
    userGroups.removeAttribute('id');
  },

  getModel: () => model,
};
