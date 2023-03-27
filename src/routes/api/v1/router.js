/**
 * Base router in the map v1.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import express from 'express'
import { router as accountRouter } from './account-router.js'
import { router as moviesRouter } from './moviesRouter.js'
import { router as webhookRouter } from './webhookRouter.js'
import { baseLinks } from '../../../util/LinkHandler.js'

export const router = express.Router()

router.get('/', (req, res) => res.json({
  message: 'Welcome to this Movie Api!',
  links: baseLinks(req)
}))
router.use('/user', accountRouter)
router.use('/movie', moviesRouter)
router.use('/webhook', webhookRouter)
