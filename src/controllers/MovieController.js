import { MovieService } from "../services/MovieService.js"
import { Movie } from '../models/movies.js'
import { createLink } from "../util/LinkHandler.js"

export class MovieController {
  #movieService

  constructor(service = new MovieService()) {
    this.#movieService = service
  }
  
  testFunction() {
    console.log('TEST we are inside of MovieController')
    this.#movieService.testFunction()
  }

  async createMovie(req, res, next) {
    console.log('we are inside of create movie')
    try {
      /* const movie = new Movie({
        title: req.body.title,
        category: req.body.category,
        releaseYear: req.body.releaseYear,
        createdByUserId: req.user.id
      }) */
      const movie = await this.#movieService.createMovie(new Movie({
        title: req.body.title,
        category: req.body.category,
        releaseYear: req.body.releaseYear,
        createdByUserId: req.user.id
      }))
      /* const movie = await this.#service.createMovie({
        title: req.body.title,
        category: req.body.category,
        releaseYear: req.body.releaseYear,
        createdByUserId: req.user.id
      }) */

      const movieObj = {
        title: movie.title,
        category: movie.category,
        releaseYear: movie.releaseYear,
        createdByUserId: movie.createdByUserId,
        createdAt: movie.createdAt,
        updatedAt: movie.updatedAt,
        id: movie.id,
        links: [{
          rel: 'self',
          href: createLink(req, '/movie/create')
        }, {
          rel: 'delete',
          href: createLink(req, `/movie/delete/${movie.id}`)
        }]
      }

      console.log('*********')

      res
        .status(201)
        .json(movieObj)
      // this.#service.createMovie(movie)
    } catch (err) {
      console.log(err)
    }
  }

  async deleteSpecificMovie(req, res, next) {
    try {
      const deletedMovie = await this.#movieService.deleteSpecificMovie(req, res, next)
      console.log('deletedMovie')
      console.log(deletedMovie)

      res
        .status(204)
        .json(deletedMovie)
    } catch (err) {
      console.log('do we get inside of here? catch delete')
      res.status(err)
    }
  }

  async getAllMovies(req, res, next) {
    console.log('get all movies')
    const movies = await this.#movieService.getAllMovies(req, res, next)
    console.log(movies)
    console.log(req.user)
    const moviesArray = []

    movies.forEach((movie) => {
      const movieObj = {
        title: movie.title,
        category: movie.category,
        releaseYear: movie.releaseYear,
        createdAt: movie.createdAt,
        updatedAt: movie.updatedAt,
        id: movie.id
      }
      moviesArray.push(movieObj)
    })
    console.log('---------')
    console.log(moviesArray)
    res
      .status(200)
      .json(movies)
  }

  async updateSomePartInMovie(req, res, next) {
    try {
      console.log('update some parts in the movie')
      const movieUpdated = await this.#movieService.updateSomePartInMovie(req, res, next)
      console.log(movieUpdated)
      res
        .status(204)
        .json(movieUpdated)
    } catch (err) {
      console.log('WE ARE INSIDE OF THIS CATCH ERROR')
      console.log(err)
      console.log(err.status)
      next(err)
    }
  }

  async updateAllInMovie(req, res, next) {
    try {
      this.#movieService.updateAllInMovie(req, res, next)
    } catch (err) {
      next(err)
    }
  }

  createReview(req, res, next) {
    this.#movieService.createReview(req, res, next)
  }
}