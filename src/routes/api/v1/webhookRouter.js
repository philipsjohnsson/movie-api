/**
 * Account router.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import express from 'express'
import { authenticateJWT } from '../../../middlewares/verifyJWT.js'
// import { AccountController } from '../../../controllers/api/account-controller.js'

export const router = express.Router()

/**
 *
 */
const resolveWebhookController = (req) => req.app.get('container').resolve('WebhookController')

router.post('/register', authenticateJWT, (req, res, next) => resolveWebhookController(req).testFunction(req, res, next))
router.post('/trigger', (req, res, next) => resolveWebhookController(req).testFunctionTrigger(req, res, next))
router.post('/test', (req, res, next) => resolveWebhookController(req).testWebhook(req, res, next))
