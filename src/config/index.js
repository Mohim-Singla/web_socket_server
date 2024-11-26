import dotenv from 'dotenv';

dotenv.config();

export const serviceConfig = {
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  PASSWORD_SALT_ROUNDS: +process.env.PASSWORD_SALT_ROUNDS,
};
