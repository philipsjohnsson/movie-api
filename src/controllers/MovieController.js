import { MovieService } from "../services/MovieService.js"
import { Movie } from '../models/movies.js'
import { createLink } from "../util/LinkHandler.js"

export class MovieController {
  #service

  constructor(service = new MovieService()) {
    this.#service = service
  }
  
  testFunction() {
    console.log('TEST we are inside of MovieController')
    this.#service.testFunction()
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
      const movie = await this.#service.createMovie(new Movie({
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

      // this.#service.createMovie(movie)

      console.log('*********')

      res
        .status(201)
        .json(movieObj)
      // this.#service.createMovie(movie)
    } catch (err) {
      console.log(err)
    }
  }

  deleteSpecificMovie(req, res, next) {
    console.log()
  }

  async getAllMovies(req, res, next) {
    console.log('get all movies')
    const movies = await this.#service.getAllMovies(req, res, next)
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

  createReview(req, res, next) {
    this.#service.createReview(req, res, next)
  }
}