/**
 * Base router in the map v1.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import express from 'express'
import { router as accountRouter } from './account-router.js'
import { router as moviesRouter } from './moviesRouter.js'

export const router = express.Router()

router.get('/', (req, res) => res.json({
  message: 'Welcome to this Movie Api!',
  links: [
    {
      rel: 'self',
      href: `${req.protocol}://${req.get('host')}/api/v1`
    }

  ]
}))
router.use('/user', accountRouter)
router.use('/movie', moviesRouter)
