/**
 * Base router.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import express from 'express'
import createError from 'http-errors'
import { router as v1Router } from './api/v1/router.js'
// import { router as v1Router } from './user/router.js'

export const router = express.Router()

// router.use('/api/v1', v1Router)
router.use('/api/v1', v1Router)

// Catch 404 (ALWAYS keep this as the last route).
router.use('*', (req, res, next) => next(createError(404)))
