import { Model, DataTypes } from 'sequelize';

const schema = {
  groupId: { type: DataTypes.STRING, required: true },
  title: { type: DataTypes.STRING, required: true },
  type: { type: DataTypes.STRING, required: true },
  createdBy: { type: DataTypes.STRING, required: true },
  description: { type: DataTypes.STRING },
};

let model;

export const groupsModel = {
  init: async (mysqlConnection) => {
    class groups extends Model {}
    model = groups.init(schema, { sequelize: mysqlConnection, modelName: 'groups' });
    groups.removeAttribute('id');
  },

  getModel: () => model,
};
