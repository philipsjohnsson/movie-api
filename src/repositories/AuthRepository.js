import createError from 'http-errors'
import { User } from '../models/user.js'
import jwt from 'jsonwebtoken'

export class AuthRepository {

  testFunction(req, res, next) {
    console.log('TEST FUNCTION INSIDE OF AUTH REPOSITORY')
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
        password: req.body.password
      })
      console.log(user)
      await user.save()

      res
        .status(201)
        .json({ id: user.id, login: 'localhost:8080/api/v1/user/login' })
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
        id: user._id
      }

      const accessToken = jwt.sign(payload, token, {
        algorithm: 'RS256',
        expiresIn: process.env.ACCESS_TOKEN_LIFE
      })

      res // Make repository responsible for this instead.
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