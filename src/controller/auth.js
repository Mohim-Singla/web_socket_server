import { service } from '../service/index.js';

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
 * @throws {object} Error object with details in case of failure.
 * @description Creates a new user with the provided details and sends a success response if successful. Logs and returns an error response if something goes wrong.
 */
async function signup (req, res) {
  try {
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

export const auth = {
  signup,
};
