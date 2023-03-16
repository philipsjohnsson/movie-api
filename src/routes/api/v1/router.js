/**
 * Base router in the map v1.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import express from 'express'
import { router as accountRouter } from './account-router.js'

export const router = express.Router()

router.use('/', accountRouter)
