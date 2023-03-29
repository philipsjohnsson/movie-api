import { AuthService } from '../services/AuthService.js'

/**
 *
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

  testFunction(req, res, next) {
    this.#authService.testFunction(req, res, next)
  }

  login(req, res, next) {
    this.#authService.login(req, res, next)
  }

  register(req, res, next) {
    this.#authService.register(req, res, next)
  }
}
