/**
 * Account router.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import express from 'express'
// import { AccountController } from '../../../controllers/api/account-controller.js'

export const router = express.Router()

/**
 *
 */
const resolveMovieController = (req) => req.app.get('container').resolve('MovieController')

// const controller = new AccountController()

// router.use('/', () => console.log('TEST TEST'))

router.post('/test', (req, res, next) => resolveMovieController(req).testFunction(req, res, next))
router.post('/create', (req, res, next) => resolveMovieController(req).createMovie(req, res, next))

// router.post('/register', controller.checkClientError, controller.register)
// router.post('/login', (req, res, next) => controller.login(req, res, next))
