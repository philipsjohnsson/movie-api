/**
 * AuthController.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import { AuthService } from '../services/AuthService.js'

/**
 * AuthController class for the API.
 */
export class AuthController {
  #authService

  /**
   * Constructor for AuthController.
   *
   * @param {object} service - AuthService.
   */
  constructor (service = new AuthService()) {
    this.#authService = service
  }

  /**
   * Login a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  login (req, res, next) {
    this.#authService.login(req, res, next)
  }

  /**
   * Register a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  register (req, res, next) {
    this.#authService.register(req, res, next)
  }
}
