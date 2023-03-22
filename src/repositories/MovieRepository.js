import { Movie } from '../models/movies.js'

export class MovieRepository {
  testFunction() {
    console.log('TEST inside of MovieRepository')
  }

  async createMovie(req, res, next, movie) {
    try {
      console.log('we are inside of create movie in MOVIE repository')
      console.log(req.body)
      /* const movie = new Movie({
        title: req.body.title,
        category: req.body.category,
        releaseYear: req.body.releaseYear
      }) */
      console.log(movie)
      await movie.save()
    } catch (err) {
      console.log(err)
      console.log('_________________')
      console.log(err.code)
    }
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