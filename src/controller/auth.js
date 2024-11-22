import { service } from '../service/index.js';
import { utils } from '../utils/index.js';

/**
 * Handles the user signup process.
 * @async
 * @function signup
 * @param {object} req - Express request object.
 * @param {object} req.body - Request body containing user details.
 * @param {string} req.body.email - User's email address.
 * @param {string} req.body.name - User's name.
 * @param {string} req.body.password - User's password.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response indicating success or failure.
 * @throws {Error} Throws an error if the operation fails.
 * @description Creates a new user with the provided details. Returns a success response if the user is created successfully. If the email already exists, returns a conflict response. Logs and sends a generic error response if an unexpected error occurs.
 */
async function signup (req, res) {
  try {
    const existingUser = await service.user.fetchOneWithEmail(req.body.email);
    if(existingUser) {
      return res.error('User email already exists.', null, 409, 409);
    }

    const newUser = await service.user.create({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      isEnabled: true,
    });
    return res.success('User signup successful.', newUser, 201);
  } catch (error) {
    console.error('User signup failed.', error);
    return res.error('Something went wrong.', error.message, 500, 500);
  }
}

/**
 * Handles the user login process.
 * @async
 * @function login
 * @param {object} req - Express request object.
 * @param {object} req.body - Request body containing user credentials.
 * @param {string} req.body.email - User's email address.
 * @param {string} req.body.password - User's password.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response indicating success or failure.
 * @throws {Error} Logs and sends an error response if the operation fails.
 * @description
 * - Validates the email and password provided by the user.
 * - If the user account is deactivated, responds with a forbidden error.
 * - If the password is incorrect, responds with a forbidden error.
 * - If authentication succeeds, responds with success.
 */
async function login(req, res) {
  try {
    const userDetails = await service.user.fetchOneWithEmail(req.body.email);
    if (!userDetails.isEnabled) {
      return res.error('User account is not active.', null, 403, 403);
    }
    const isPasswordValid = await service.user.validatePassword(req.body.password, userDetails.password);
    if (!isPasswordValid) {
      return res.error('Incorrect user email or password.', null, 403, 403);
    }

    const token = await utils.common.signToken({ email: userDetails.email, userId: userDetails.userId });

    return res.success('User login successfuk.', { token, name: userDetails.name }, 200, 200);
  } catch (error) {
    console.error('User login failed.', error);
    return res.error('Something went wrong.', error.message, 500, 500);
  }
}

export const auth = {
  signup,
  login,
};
