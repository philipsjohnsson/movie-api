import { Movie } from '../models/movies.js'
import createError from 'http-errors'

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

  async updateSomePartInMovie(req, res, next) {
    const movie = await Movie.findOne({ id: req.params.id })

    if (movie.createdByUserId !== req.user.id) {
      const test = await Movie.findByIdAndUpdate(req.params.id, req.body)// validator might be added here.
      console.log(':::::::::::::')
      console.log(test)
      return test
    } else {
      throw createError(403)
    }
  }

  async deleteSpecificMovie(req, res, next) {
    console.log('delete specific movie')
    console.log(req.params.id)
    const movie = await Movie.findOne({ id: req.params.id })
    console.log('---_---_---_---_---')
    console.log(movie.createdByUserId)
    console.log(req.user.id)

    if (movie.createdByUserId !== req.user.id) {
      return await Movie.findByIdAndDelete(req.params.id)
    } else {
      throw createError(403)
    }
  }
}
