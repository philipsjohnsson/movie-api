import { MovieService } from "../services/MovieService.js"

export class MovieController {
  #service

  constructor(service = new MovieService()) {
    this.#service = service
  }
  
  testFunction() {
    console.log('TEST we are inside of MovieController')
    this.#service.testFunction()
  }

  createMovie(req, res, next) {
    console.log('we are inside of create movie')
    this.#service.createMovie(req, res, next)
  }

  createReview(req, res, next) {
    this.#service.createReview(req, res, next)
  }
}