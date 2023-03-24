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

  async updateSomePartInMovie(req, res, next) { // PATCH, UPPDATERA DELAR
    console.log('we are inside of updatesomepartinmovie')
    const movie = await Movie.findById(req.params.id) // findById
    console.log('we are förbi findById')

    // findByIdAndUpdate

    console.log(movie)

    if (movie.createdByUserId === req.user.id) {
      return await Movie.findByIdAndUpdate(req.params.id, req.body)// validator might be added here.
    } else {
      throw createError(403)
    }
  }

  async updateAllInMovie(req, res, next) { // PUT, UPPDATERA ALLT
    console.log('inside of update all in movie')
    console.log('_________________ÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖ')
    console.log(req.body)
    const movie = await Movie.findById(req.params.id)
    console.log(movie)
    const obj = {
      title: req.body.title,
      category: req.body.category,
      releaseYear: req.body.releaseYear,
      createdByUserId: movie.createdByUserId
    }

    if (movie.createdByUserId === req.user.id) {
      // return await Movie.findByIdAndUpdate(req.params.id, req.body)// validator might be added here.

      return await Movie.findOneAndReplace({ _id: req.params.id }, obj, { runValidators: true })// validator might be added here.
      // findOneAndReplace
    } else {
      throw createError(403)
    }
  }

  async deleteSpecificMovie(req, res, next) {
    const movie = await Movie.findById({ id: req.params.id })

    if (movie.createdByUserId !== req.user.id) {
      return await Movie.findByIdAndDelete(req.params.id)
    } else {
      throw createError(403)
    }
  }
}
