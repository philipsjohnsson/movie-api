/**
 * Account router.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import express from 'express'

export const router = express.Router()

/**
 * ResolveAuthController.
 *
 * @param {*} req - Express request object.
 * @returns {object} - An instance of the resolveAuthController.
 */
const resolveAuthController = (req) => req.app.get('container').resolve('AuthController')

router.get('/', (req, res, next) => resolveAuthController(req).testFunction(req, res, next))

router.post('/register', (req, res, next) => resolveAuthController(req).register(req, res, next))
router.post('/login', (req, res, next) => resolveAuthController(req).login(req, res, next))
