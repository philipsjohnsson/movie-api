import { MovieRepository } from '../repositories/MovieRepository.js'
import { Movie } from '../models/movies.js'
import { Review } from '../models/reviews.js'

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
      releaseYear: req.body.releaseYear,
      createdByUserId: req.user.id
    })
    this.#service.createMovie(req, res, next, movie)
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
}