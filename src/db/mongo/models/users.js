import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isEnabled: { type: Boolean, required: true },
});

let model;

/**
 * Users model utility.
 * Provides methods to initialize the model and retrieve the model instance.
 */
export const usersModel = {
  /**
   * Initializes the users model by creating it using the provided MongoDB connection.
   *
   * @param {mongoose.Connection} mongoConnection - The mongoose connection instance to use for creating the model.
   * @returns {Promise<void>} Resolves once the model is initialized.
   */
  init: async (mongoConnection) => {
    model = mongoConnection.model('users', schema, 'users');
  },

  /**
   * Retrieves the users model instance.
   *
   * @returns {mongoose.Model} The mongoose model instance for the 'users' collection.
   */
  getModel: () => model,
};
