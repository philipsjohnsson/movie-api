/**
 * MovieController.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import { MovieService } from '../services/MovieService.js'
import { Movie } from '../models/movies.js'

/**
 * MovieController for the API.
 */
export class MovieController {
  #movieService

  /**
   * Contructor for the MovieController in the API.
   *
   * @param { object } service - MovieSerivce for the API.
   */
  constructor (service = new MovieService()) {
    this.#movieService = service
  }

  /**
   * Get specific movie.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getSpecificMovie (req, res, next) {
    try {
      const response = await this.#movieService.getSpecificMovie(req)

      res
        .status(200) // check this
        .json(response)
    } catch (err) {
      next(err)
    }
  }

  /**
   * Creates a movie.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async createMovie (req, res, next) {
    try {
      console.log('TEST WE CREATE A MOVIE HERE')
      const movieObj = await this.#movieService.createMovie(req, res, next, new Movie({
        title: req.body.title,
        category: req.body.category,
        releaseYear: req.body.releaseYear,
        createdByUserId: req.user.id
      }))

      res
        .status(201)
        .json(movieObj)
    } catch (err) {
      next(err)
    }
  }

  /**
   * Deletes a specific movie.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async deleteSpecificMovie (req, res, next) {
    try {
      const deletedMovie = await this.#movieService.deleteSpecificMovie(req, res, next)

      res
        .status(200)
        .json(deletedMovie)
    } catch (err) {
      next(err)
    }
  }

  /**
   * Gets all of the movies in the database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getAllMovies (req, res, next) {
    const response = await this.#movieService.getAllMovies(req, res, next)

    res
      .status(200)
      .json(response)
  }

  /**
   * Update some parts of a specific movie.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async updateSomePartInMovie (req, res, next) {
    try {
      const responseObj = await this.#movieService.updateSomePartInMovie(req, res, next)

      res
        .status(200)
        .json(responseObj)
    } catch (err) {
      next(err)
    }
  }

  /**
   * Updates all in a specific movie.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async updateAllInMovie (req, res, next) {
    try {
      const responseObj = await this.#movieService.updateAllInMovie(req, res, next)

      res
        .status(200)
        .json(responseObj)
    } catch (err) {
      next(err)
    }
  }
}
