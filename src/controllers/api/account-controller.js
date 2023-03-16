import jwt from 'jsonwebtoken'
import { User } from '../../models/user.js'
import createError from 'http-errors'

/**
 * Class for the account controller.
 */
export class AccountController {
  /**
   * Checks client error.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async checkClientError (req, res, next) {
    try {
      console.log(req.body)
      if (req.body.username === undefined || req.body.password === undefined || req.body.firstName === undefined || req.body.lastName === undefined || req.body.email === undefined) {
        console.log('coming inside of here.')
        const err = createError(400)
        next(err)
      } else {
        next()
      }
    } catch (err) {
      next(err)
    }
  }

  /**
   * Register a new user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async register (req, res, next) {
    try {
      console.log('inside of controller and register method')
      console.log(req.body)
      const user = new User({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      })
      console.log(user)
      await user.save()

      res
        .status(201)
        .json({ id: user.id })
    } catch (err) {
      console.log(err)
      let error = err
      if (err.code === 11000) {
        error = createError(409)
      } else if (err.name === 'ValidationError') {
        error = createError(400)
      }
      next(error)
    }
  }

  /**
   * Login a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async login (req, res, next) {
    try {
      const token = Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64') // Gör om det till bytes.

      const user = await User.authenticate(req.body.username, req.body.password)

      console.log(user)
      const payload = {
        username: user.username,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        id: user._id
      }

      const accessToken = jwt.sign(payload, token, {
        algorithm: 'RS256',
        expiresIn: process.env.ACCESS_TOKEN_LIFE
      })

      res
        .status(201)
        .json({
          access_token: accessToken
        })
    } catch (err) {
      const error = createError(401)
      console.log(err)
      next(error)
    }
  }
}
