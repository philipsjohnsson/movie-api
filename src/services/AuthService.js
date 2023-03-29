/**
 * AuthService.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import { AuthRepository } from '../repositories/AuthRepository.js'

/**
 * AuthService
 */
export class AuthService {
  #repository

  /**
   * Constructor for MovieService.
   *
   * @param { object } repository - AuthRepository.
   */
  constructor (repository = new AuthRepository()) {
    this.#repository = repository
  }

  /**
   * Login a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  login (req, res, next) {
    this.#repository.login(req, res, next)
  }

  /**
   * Register a new user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  register (req, res, next) {
    this.#repository.register(req, res, next)
  }
}
