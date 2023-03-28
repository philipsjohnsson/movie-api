import { AuthRepository } from '../repositories/AuthRepository.js'

/**
 *
 */
export class AuthService {
  #repository

  constructor(repository = new AuthRepository()) {
    this.#repository = repository
  }

  testFunction(req, res, next) {
    this.#repository.testFunction(req, res, next)
  }

  login(req, res, next) {
    this.#repository.login(req, res, next)
  }

  register(req, res, next) {
    this.#repository.register(req, res, next)
  }
}
