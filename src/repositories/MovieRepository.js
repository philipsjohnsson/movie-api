/**
 * MovieRepository.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import { Movie } from '../models/movies.js'
import createError from 'http-errors'
import mongoose from 'mongoose'

/**
 * MovieRepository.
 */
export class MovieRepository {
  /**
   * Register a new user.
   *
   * @param {object} movie - the movie that should be created.
   */
  async createMovie (movie) {
    try {
      console.log('create movie')
      return await movie.save()
    } catch (err) {
      throw this.#checkStatusError(err)
    }
  }

  /**
   * Get all movies.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getAllMovies (req, res, next) {
    try {
      const moviestest = Movie.find()
      return moviestest
    } catch (err) {
      throw this.#checkStatusError(err)
    }
  }

  /**
   * Get a specific movie.
   *
   * @param {object} req - Express request object.
   */
  async getSpecificMovie (req) {
    try {
      this.#validateObjectId(req.params.id)
      const movie = await Movie.findById(req.params.id)
      console.log(movie)
      if (movie !== null) {
        return movie
      } else {
        throw createError(404)
      }
    } catch (err) {
      throw this.#checkStatusError(err)
    }
  }

  /**
   * Update some part in a specific movie.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async updateSomePartInMovie (req, res, next) {
    try {
      const movie = await this.getSpecificMovie(req)

      if (movie.createdByUserId === req.user.id) {
        await Movie.findByIdAndUpdate(req.params.id, req.body)
      } else {
        throw createError(403)
      }
    } catch (err) {
      throw this.#checkStatusError(err)
    }
  }

  /**
   * Update all in a specific movie.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async updateAllInMovie (req, res, next) { // check 400, if all is implemented.
    try {
      const movie = await this.getSpecificMovie(req)
      const obj = {
        title: req.body.title,
        category: req.body.category,
        releaseYear: req.body.releaseYear,
        createdByUserId: movie.createdByUserId
      }

      if (movie.createdByUserId === req.user.id) {
        return await Movie.findOneAndReplace({ _id: req.params.id }, obj, { runValidators: true })// validator might be added here.
      } else {
        throw createError(403)
      }
    } catch (err) {
      throw this.#checkStatusError(err)
    }
  }

  /**
   * Delete a specific movie.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async deleteSpecificMovie (req, res, next) {
    try {
      const movie = await this.getSpecificMovie(req)

      if (movie.createdByUserId === req.user.id) {
        return await Movie.findByIdAndDelete(req.params.id)
      } else {
        throw createError(403)
      }
    } catch (err) {
      throw this.#checkStatusError(err)
    }
  }

  /**
   * Validate if the id is a objectId that .
   *
   * @param {object} id - the id to check.
   */
  #validateObjectId (id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createError(404)
    }
  }

  /**
   * Check what error it is.
   *
   * @param { Error } err - the error to check.
   * @returns { Error } - returns an error.
   */
  #checkStatusError (err) {
    let error = null
    if (err.status === 403) {
      error = createError(403)
    } else if (err.status === 404) {
      error = createError(404)
    } else if (err.status === 401) {
      error = createError(401)
    } else if (err.status === 400) {
      error = createError(400)
    } else {
      throw createError(500)
    }
    return error
  }
}
