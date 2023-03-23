import { Movie } from '../models/movies.js'

export class MovieRepository {
  #model

  constructor(model) {
    this.#model = model
  }

  testFunction() {
    console.log('TEST inside of MovieRepository')
  }

  async createMovie(movie) {
    try {
      console.log('CREATE MOVIE')
      console.log(movie)
      return await movie.save()
      // await movie.save()
      // return this.#model.save(movie)
    } catch (err) {
      console.log(err)
      console.log('_________________')
      console.log(err.code)
    }
  }

  async getAllMovies(req, res, next, movies) {
    console.log('GET ALL MOVIES')
    const moviestest = Movie.find()
    return moviestest
  }

  async createReview(req, res, next, review) {
    try {
      console.log('we are inside of create movie in MOVIE repository')
      console.log(req.body)
      /* const movie = new Movie({
        title: req.body.title,
        category: req.body.category,
        releaseYear: req.body.releaseYear
      }) */
      console.log(review)
      await review.save()
    } catch (err) {
      console.log(err)
      console.log('_________________')
      console.log(err.code)
    }
  }
}