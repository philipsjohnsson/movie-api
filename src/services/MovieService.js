import { MovieRepository } from '../repositories/MovieRepository.js'
import { Movie } from '../models/movies.js'
import { Review } from '../models/reviews.js'
import createError from 'http-errors'
import fetch from 'node-fetch'
import { createLink, getLinks, baseLinks, loggedInUserGetLinks } from '../util/LinkHandler.js'

export class MovieService {
  #service

  constructor(service = new MovieRepository()) {
    this.#service = service
  }

  testFunction() {
    console.log('WE ARE INSIDE OF MOVIE SERVICE')
    this.#service.testFunction()
  }

  async getSpecificMovie(req) {
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

  async getAllMovies(req, res, next) {
    console.log(':::::::::::::::')
    console.log(req.originalUrl)
    const movies = await this.#service.getAllMovies(req, res, next)
    const moviesArray = []

    movies.forEach((movie) => { // Lägga detta i service.
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

  async createMovie(req, res, next, movie) {
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

  createReview(req, res, next) {
    console.log(req.body)
    const review = new Review({
      grade: req.body.grade,
      movieId: req.body.movieId,
      description: req.body.description,
      createdById: req.body.createdById
    })
    console.log(review)
    this.#service.createReview(req, res, next, review)
  }

  async updateSomePartInMovie(req, res, next) {
    if (this.#isClientErrorBadRequestOkPatch(req)) {
      const movie = await this.#service.updateSomePartInMovie(req, res, next)
      console.log('------------------')
      console.log(movie)
      const responseObj = {
        message: 'Updated correctly',
        links: baseLinks(req)
      }
      return responseObj
    } else {
      throw createError(400)
    }
  }

  async updateAllInMovie(req, res, next) {
    if (this.#isClientErrorBadRequestOk(req)) {
      const movie = await this.#service.updateAllInMovie(req, res, next)
      console.log('------------')
      console.log(movie)
      const responseObj = {
        message: 'Updated correctly',
        links: baseLinks(req)
      }
      return responseObj
    } else {
      throw createError(400)
    }
  }

  #isClientErrorBadRequestOk(req) {
    if ((req.body.title !== undefined && req.body.category !== undefined) && (req.body.releaseYear !== undefined)) {
      return true
    } else {
      return false
    }
  }

  #isClientErrorBadRequestOkPatch(req) {
    if ((req.body.title !== undefined || req.body.category !== undefined) || (req.body.releaseYear !== undefined)) {
      return true
    } else {
      return false
    }
  }

  async deleteSpecificMovie(req, res, next) {
    await this.#service.deleteSpecificMovie(req, res, next)
    const responseObj = {
      message: 'Deleted correctly',
      links: baseLinks(req)
    }

    return responseObj
  }
}
