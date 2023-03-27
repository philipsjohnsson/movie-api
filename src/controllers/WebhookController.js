import { HookMovie } from '../models/hookmovie.js'
import { WebhookService } from '../services/WebhookService.js'

export class WebhookController {
  #webhookService

  constructor(service = new WebhookService()) {
    this.#webhookService = service
  }

  testFunction(req, res, next) {
    console.log('WEBHOOK CONTROLLER')
    try {
      this.#webhookService.registerNewMovieHook(req, res, new HookMovie({
        url: req.body.url,
        events: req.body.events
      }))

      res
        .status(200)
        .json()
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  testFunctionTrigger(req, res, next) {
    this.#webhookService.testFunctionTrigger(req, res, next)

    next()
  }

  testWebhook(req, res, next) {
    console.log('..WEBHOOK TEST..')
    console.log(req.body)
  }
}