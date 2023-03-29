import jwt from 'jsonwebtoken'
import createError from 'http-errors'

/**
 * Check if the JWT is correct.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const authenticateJWT = (req, res, next) => {
  try {
    const publicKey = Buffer.from(process.env.ACCESS_TOKEN_PUBLIC, 'base64')

    const [authenticationScheme, token] = req.headers.authorization?.split(' ')

    if (authenticationScheme !== 'Bearer') {
      throw new Error('Invalid authentication scheme.')
    }

    const payload = jwt.verify(token, publicKey)
    req.user = {
      username: payload.username,
      id: payload.id
    }

    next()
  } catch (err) {
    const error = createError(401)
    next(error)
  }
}
