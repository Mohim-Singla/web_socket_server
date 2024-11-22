import { utils } from '../utils/index.js';

/**
 * Middleware to authenticate requests using JSON Web Token (JWT).
 *
 * @async
 * @function authenticate
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} Calls `next()` on successful authentication or sends an error response.
 */
export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
    if (!token) {
      return res.error('Token not provided', null, 401, 401);
    }

    const decodedData = await utils.common.verifyToken(token);
    req.user = decodedData;
    next();
  } catch (error) {
    return res.error('Invalid or expired token.', error.message, 401, 401);
  }
};