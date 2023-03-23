/**
 * Module for bootstrapping.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import { IoCContainer } from '../util/IoCContainer.js'
import { AuthService } from '../services/AuthService.js'
// import { UserService } from '../services/UserService.js'
// import { HomeController } from '../controllers/HomeController.js'
import { AuthController } from '../controllers/AuthController.js'
import { AuthRepository } from '../repositories/AuthRepository.js'
import { MovieController } from '../controllers/MovieController.js'
import { MovieService } from '../services/MovieService.js'
import { MovieRepository } from '../repositories/MovieRepository.js'
import { Movie } from '../models/movies.js'
// import { UserController } from '../controllers/UserController.js'

const iocContainer = new IoCContainer()

/* iocContainer.register('UserService', UserService, {
  singleton: true
}) */

iocContainer.register('AuthService', AuthService, {
  dependencies: [
    'AuthRepository'
  ],
  singleton: true
})

iocContainer.register('AuthRepository', AuthRepository, {
  singleton: true
})

/* iocContainer.register('UserController', UserController, {
  dependencies: [
    'UserService'
  ],
  singleton: true
}) */

iocContainer.register('Movie', Movie, { type: true })

iocContainer.register('MovieRepository', MovieRepository, {
  dependencies: [
    'Movie'
  ],
  singleton: true
})

iocContainer.register('MovieService', MovieService, {
  singleton: true
})

iocContainer.register('AuthController', AuthController, {
  dependencies: [
    'AuthService'
  ],
  singleton: true
})

iocContainer.register('MovieController', MovieController, {
  dependencies: [
    'MovieService'
  ],
  singleton: true
})

/* iocContainer.register('HomeController', HomeController, {
  singleton: true
}) */

export const container = Object.freeze(iocContainer)
