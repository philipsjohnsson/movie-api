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
  

  async register (req, res, next) {
    try {
      console.log('inside of controller and register method')
      console.log(req.body)
      const user = new User({
        username: req.body.username,
        password: req.body.password
      })
      console.log(user)
      await user.save()

      res
        .status(201)
        .json({ id: user.id, login: 'localhost:8080/api/v1/user/login' })
    } catch (err) {
      console.log(err)
      let error = err
      if (err.code === 11000) {
        error = createError(409)
      } else if (err.name === 'ValidationError') {
        error = createError(400)
      }
      next(error)
    }
  }
}