/**
 * Account router.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import express from 'express'
// import { AccountController } from '../../../controllers/api/account-controller.js'

export const router = express.Router()

// const controller = new AccountController()
/**
 * 
 * @param {*} req 
 * @returns 
 */
const resolveAuthController = (req) => req.app.get('container').resolve('AuthController')
console.log('TEST')

router.get('/', (req, res, next) => resolveAuthController(req).testFunction(req, res, next))

// router.post('/register', controller.checkClientError, controller.register)
router.post('/register', (req, res, next) => resolveAuthController(req).register(req, res, next))
router.post('/login', (req, res, next) => resolveAuthController(req).login(req, res, next))
