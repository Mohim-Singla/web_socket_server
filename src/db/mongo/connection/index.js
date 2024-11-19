import mongoose from 'mongoose';
import { mongoConnectionConfig } from '../../../config/database/mongoConnectionConfig.js';

let mongoConnectionInstance = null;

async function init() {
  const encodedUser = encodeURIComponent(mongoConnectionConfig.user);
  const encodedPassword = encodeURIComponent(mongoConnectionConfig.password);
  const protocol = mongoConnectionConfig.isSRV ? 'mongodb+srv' : 'mongodb';

  const connectionURL = `${protocol}://${encodedUser}:${encodedPassword}@${mongoConnectionConfig.host}/${mongoConnectionConfig.database}';`;
  const connectionOptions = {
    authSource: 'admin',
  };
  mongoConnectionInstance = mongoose.createConnection(connectionURL, connectionOptions);

  return mongoConnectionInstance;
}

export const mongoConnection = {
  init,
  getInstance: () => mongoConnectionInstance ?? init(),
};
