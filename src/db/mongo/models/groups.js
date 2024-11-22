import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  groupId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  type: { type: String, required: true, enum: ['public', 'private'] },
  description: { type: String, trim: true },
  members: [{ type: mongoose.Schema.Types.ObjectId }],
}, { timestamps: true });

let model;

/**
 * groups model utility.
 * Provides methods to initialize the model and retrieve the model instance.
 */
export const groupsModel = {
  /**
   * Initializes the groups model by creating it using the provided MongoDB connection.
   *
   * @param {mongoose.Connection} mongoConnection - The mongoose connection instance to use for creating the model.
   * @returns {Promise<void>} Resolves once the model is initialized.
   */
  init: async (mongoConnection) => {
    model = mongoConnection.model('groups', schema, 'groups');
  },

  /**
   * Retrieves the groups model instance.
   *
   * @returns {mongoose.Model} The mongoose model instance for the 'groups' collection.
   */
  getModel: () => model,
};
