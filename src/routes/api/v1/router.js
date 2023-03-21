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

router.use('/user', accountRouter)
router.use('/movies', moviesRouter)
