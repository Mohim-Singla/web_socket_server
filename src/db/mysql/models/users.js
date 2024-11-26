import { Model, DataTypes } from 'sequelize';

const schema = {
  userId: { type: DataTypes.STRING, required: true },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, required: true },
  password: { type: DataTypes.STRING },
  isEnabled: { type: DataTypes.BOOLEAN },
};

let model;

export const usersModel = {
  init: async (mysqlConnection) => {
    class Users extends Model {}
    model = Users.init(schema, { sequelize: mysqlConnection, modelName: 'users' });
  },

  getModel: () => model,
};
