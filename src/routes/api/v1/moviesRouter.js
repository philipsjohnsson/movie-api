/**
 * Account router.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import express from 'express'
import { authenticateJWT } from '../../../middlewares/verifyJWT.js'

export const router = express.Router()

/**
 *
 */
const resolveMovieController = (req) => req.app.get('container').resolve('MovieController')

router.post('/test', (req, res, next) => resolveMovieController(req).testFunction(req, res, next))
router.post('/', authenticateJWT, (req, res, next) => resolveMovieController(req).createMovie(req, res, next))
router.get('/', (req, res, next) => resolveMovieController(req).getAllMovies(req, res, next))
router.post('/review/create', authenticateJWT, (req, res, next) => resolveMovieController(req).createReview(req, res, next))

router.get('/:id', (req, res, next) => resolveMovieController(req).getSpecificMovie(req, res, next))
router.delete('/:id', authenticateJWT, (req, res, next) => resolveMovieController(req).deleteSpecificMovie(req, res, next))
router.patch('/:id', authenticateJWT, (req, res, next) => resolveMovieController(req).updateSomePartInMovie(req, res, next))
router.put('/:id', authenticateJWT, (req, res, next) => resolveMovieController(req).updateAllInMovie(req, res, next))
