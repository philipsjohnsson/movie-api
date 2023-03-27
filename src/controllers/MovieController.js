import { MovieService } from '../services/MovieService.js'
import { Movie } from '../models/movies.js'
import { createLink, getLinks, baseLinks, loggedInUserGetLinks } from '../util/LinkHandler.js'

export class MovieController {
  #movieService

  constructor(service = new MovieService()) {
    this.#movieService = service
  }

  testFunction() {
    console.log('TEST we are inside of MovieController')
    this.#movieService.testFunction()
  }

  async getSpecificMovie(req, res, next) {
    try {
      const response = await this.#movieService.getSpecificMovie(req)

      res
        .status(200) // check this
        .json(response)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  async createMovie(req, res, next) {
    try {
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

  async deleteSpecificMovie(req, res, next) {
    try {
      const deletedMovie = await this.#movieService.deleteSpecificMovie(req, res, next)

      res
        .status(200)
        .json(deletedMovie)
    } catch (err) {
      next(err)
    }
  }

  async getAllMovies(req, res, next) {
    const response = await this.#movieService.getAllMovies(req, res, next)

    res
      .status(200)
      .json(response)
  }

  async updateSomePartInMovie(req, res, next) {
    try {
      console.log('update some parts in the movie')
      const responseObj = await this.#movieService.updateSomePartInMovie(req, res, next)
      console.log('TEST')
      console.log(responseObj)

      res
        .status(200)
        .json(responseObj)
    } catch (err) {
      next(err)
    }
  }

  async updateAllInMovie(req, res, next) {
    try {
      const responseObj = await this.#movieService.updateAllInMovie(req, res, next)

      res
        .status(200)
        .json(responseObj)
    } catch (err) {
      next(err)
    }
  }

  createReview(req, res, next) {
    this.#movieService.createReview(req, res, next)
  }
}