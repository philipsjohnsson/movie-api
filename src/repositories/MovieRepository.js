import { Movie } from '../models/movies.js'
import createError from 'http-errors'
import mongoose from 'mongoose'

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
      return await movie.save()
    } catch (err) {
      throw this.checkStatusError(err)
    }
  }

  async getAllMovies(req, res, next, movies) {
    try {
      const moviestest = Movie.find()
      return moviestest
    } catch (err) {
      throw this.checkStatusError(err)
    }
  }

  async createReview(req, res, next, review) { // kolla 400, om det är nån som skickar in fel.
    try {
      await review.save()
    } catch (err) {
      throw this.checkStatusError(err)
    }
  }

  async getSpecificMovie(req) {
    try {
      this.#validateObjectId(req.params.id)
      const movie = await Movie.findById(req.params.id)
      if (movie !== null) {
        return movie
      } else {
        throw createError(404)
      }
    } catch (err) {
      throw this.checkStatusError(err)
    }
  }

  #validateObjectId(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createError(404)
    }
  }

  async updateSomePartInMovie(req, res, next) { // PATCH, UPPDATERA DELAR, // kolla 400, om det är nån som skickar in fel.
    try {
      const movie = await this.getSpecificMovie(req)

      if (movie.createdByUserId === req.user.id) {
        await Movie.findByIdAndUpdate(req.params.id, req.body)// validator might be added here.
      } else {
        throw createError(403)
      }
    } catch (err) {
      throw this.checkStatusError(err)
    }
  }

  async updateAllInMovie(req, res, next) { // check 400, if all is implemented.
    try {
      const movie = await this.getSpecificMovie(req)
      console.log(movie)
      const obj = {
        title: req.body.title,
        category: req.body.category,
        releaseYear: req.body.releaseYear,
        createdByUserId: movie.createdByUserId
      }

      if (movie.createdByUserId === req.user.id) {
        return await Movie.findOneAndReplace({ _id: req.params.id }, obj, { runValidators: true })// validator might be added here.
      } else {
        throw createError(403)
      }
    } catch (err) {
      throw this.checkStatusError(err)
    }
  }

  async deleteSpecificMovie(req, res, next) {
    try {
      const movie = await this.getSpecificMovie(req)

      if (movie.createdByUserId === req.user.id) {
        return await Movie.findByIdAndDelete(req.params.id)
      } else {
        throw createError(403)
      }
    } catch (err) {
      throw this.checkStatusError(err)
    }
  }

  checkStatusError(err) {
    let error = null
    if (err.status === 403) {
      error = createError(403)
    } else if (err.status === 404) {
      error = createError(404)
    } else if (err.status === 401) {
      error = createError(401)
    } else if (err.status === 400) {
      error = createError(400)
    } else {
      throw createError(500)
    }
    return error
  }
}
