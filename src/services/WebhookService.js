import { WebhookRepository } from '../repositories/WebhookRepository.js'
import fetch from 'node-fetch'

export class WebhookService {
  #serviceRepository

  constructor(service = new WebhookRepository()) {
    this.#serviceRepository = service
  }

  registerNewMovieHook(req, res, subscriberForHook) {
    this.#serviceRepository.registerNewMovieHook(req, res, subscriberForHook)

    
  }

  async testFunctionTrigger(req, res, next) {
    const subscribers = await this.#serviceRepository.getAllSubscribersOnMovieHook(req, res)

    subscribers.forEach(async (subscriber) => {
      await fetch(subscriber.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
      }
      )
    })
  }
}
