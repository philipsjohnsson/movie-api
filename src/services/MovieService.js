import { MovieRepository } from '../repositories/MovieRepository.js'
import { Movie } from '../models/movies.js'

export class MovieService {
  #service

  constructor(service = new MovieRepository()) {
    this.#service = service
  }

  testFunction() {
    console.log('WE ARE INSIDE OF MOVIE SERVICE')
    this.#service.testFunction()
  }

  createMovie(req, res, next) {
    const movie = new Movie({
      title: req.body.title,
      category: req.body.category,
      releaseYear: req.body.releaseYear
    })
    this.#service.createMovie(req, res, next, movie)
  }
}