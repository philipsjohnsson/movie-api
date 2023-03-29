/**
 * ResolveWebhookController.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import express from 'express'
import { authenticateJWT } from '../../../middlewares/verifyJWT.js'

export const router = express.Router()

/**
 * ResolveWebhookController.
 *
 * @param {*} req - Express request object.
 * @returns {object} - An instance of the resolveWebhookController.
 */
const resolveWebhookController = (req) => req.app.get('container').resolve('WebhookController')

router.post('/register', authenticateJWT, (req, res, next) => resolveWebhookController(req).subscribeOnCreateMovie(req, res, next))
router.post('/trigger', (req, res, next) => resolveWebhookController(req).triggerMovieHook(req, res, next))
