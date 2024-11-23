import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  userId: { type: String, required: true },
  groupId: { type: String, required: true },
  isEnabled: { type: Boolean, required: true },
}, { timestamps: true });

let model;

/**
 * userGroups model utility.
 * Provides methods to initialize the model and retrieve the model instance.
 */
export const userGroupsModel = {
  /**
   * Initializes the userGroups model by creating it using the provided MongoDB connection.
   *
   * @param {mongoose.Connection} mongoConnection - The mongoose connection instance to use for creating the model.
   * @returns {Promise<void>} Resolves once the model is initialized.
   */
  init: async (mongoConnection) => {
    model = mongoConnection.model('userGroups', schema, 'userGroups');
  },

  /**
   * Retrieves the userGroups model instance.
   *
   * @returns {mongoose.Model} The mongoose model instance for the 'userGroups' collection.
   */
  getModel: () => model,
};
