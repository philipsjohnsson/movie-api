/**
 * Account router.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import express from 'express'
import { AccountController } from '../../../controllers/api/account-controller.js'

export const router = express.Router()

const controller = new AccountController()

router.post('/register', controller.checkClientError, controller.register)
router.post('/login', (req, res, next) => controller.login(req, res, next))
