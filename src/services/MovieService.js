/**
 * MovieService.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import { MovieRepository } from '../repositories/MovieRepository.js'
import createError from 'http-errors'
import fetch from 'node-fetch'
import { getLinks, baseLinks, loggedInUserGetLinks } from '../util/LinkHandler.js'

/**
 * MovieService.
 */
export class MovieService {
  #service

  /**
   * Constructor for MovieService.
   *
   * @param { object } service - movierepository.
   */
  constructor (service = new MovieRepository()) {
    this.#service = service
  }

  /**
   * Get a specific movie.
   *
   * @param {object} req - Express request object.
   */
  async getSpecificMovie (req) {
    const movie = await this.#service.getSpecificMovie(req)

    const movieObj = {
      title: movie.title,
      category: movie.category,
      releaseYear: movie.releaseYear,
      createdByUserId: movie.createdByUserId,
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
      id: movie.id,
      links: loggedInUserGetLinks(req, movie)
    }
    const response = {
      movie: movieObj,
      links: baseLinks(req)
    }

    return response
  }

  /**
   * Get all of the movies in the database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {string} next - Express next object.
   */
  async getAllMovies (req, res, next) {
    const movies = await this.#service.getAllMovies(req, res, next)
    const moviesArray = []

    movies.forEach((movie) => {
      const movieObj = {
        title: movie.title,
        category: movie.category,
        releaseYear: movie.releaseYear,
        createdByUserId: movie.createdByUserId,
        createdAt: movie.createdAt,
        updatedAt: movie.updatedAt,
        id: movie.id,
        links: getLinks(req, movie)
      }
      moviesArray.push(movieObj)
    })

    const response = {
      movies: moviesArray,
      links: baseLinks(req)
    }

    return response
  }

  /**
   * Get all of the movies in the database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {string} next - Express next object.
   * @param {string} movie - the specific movie.
   */
  async createMovie (req, res, next, movie) {
    if (this.#isClientErrorBadRequestOk(req)) {
      const createdMovie = await this.#service.createMovie(movie)

      await fetch(`${req.protocol}://${req.get('host')}/api/v1/webhook/trigger`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createdMovie)
      })

      const movieObj = {
        title: createdMovie.title,
        category: createdMovie.category,
        releaseYear: createdMovie.releaseYear,
        createdByUserId: createdMovie.createdByUserId,
        createdAt: createdMovie.createdAt,
        updatedAt: createdMovie.updatedAt,
        id: createdMovie.id,
        links: loggedInUserGetLinks(req, createdMovie)
      }

      return movieObj
    } else {
      throw createError(400)
    }
  }

  /**
   * Update some parts in a specific movie.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {string} next - Express next object.
   */
  async updateSomePartInMovie (req, res, next) {
    if (this.#isClientErrorBadRequestOkPatch(req)) {
      await this.#service.updateSomePartInMovie(req, res, next)

      const responseObj = {
        message: 'Updated correctly',
        links: baseLinks(req)
      }

      return responseObj
    } else {
      throw createError(400)
    }
  }

  /**
   * Update all in a specific movie.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {string} next - Express next object.
   */
  async updateAllInMovie (req, res, next) {
    if (this.#isClientErrorBadRequestOk(req)) {
      await this.#service.updateAllInMovie(req, res, next)

      const responseObj = {
        message: 'Updated correctly',
        links: baseLinks(req)
      }
      return responseObj
    } else {
      throw createError(400)
    }
  }

  /**
   * Delete a specific movie.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {string} next - Express next object.
   */
  async deleteSpecificMovie (req, res, next) {
    await this.#service.deleteSpecificMovie(req, res, next)
    const responseObj = {
      message: 'Deleted correctly',
      links: baseLinks(req)
    }

    return responseObj
  }

  /**
   * Error check.
   *
   * @param {object} req - Express request object.
   * @returns {boolean} - true/false.
   */
  #isClientErrorBadRequestOk (req) {
    if ((req.body.title !== undefined && req.body.category !== undefined) && (req.body.releaseYear !== undefined)) {
      return true
    } else {
      return false
    }
  }

  /**
   * Error check.
   *
   * @param {object} req - Express request object.
   * @returns {boolean} - true/false.
   */
  #isClientErrorBadRequestOkPatch (req) {
    if ((req.body.title !== undefined || req.body.category !== undefined) || (req.body.releaseYear !== undefined)) {
      return true
    } else {
      return false
    }
  }
}
