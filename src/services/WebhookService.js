import { WebhookRepository } from '../repositories/WebhookRepository.js'
import fetch from 'node-fetch'
import createError from 'http-errors'

export class WebhookService {
  #serviceRepository

  constructor(service = new WebhookRepository()) {
    this.#serviceRepository = service
  }

  registerNewMovieHook(req, res, subscriberForHook) {
    if (this.#isValidURL(subscriberForHook.url)) {
      this.#serviceRepository.registerNewMovieHook(req, res, subscriberForHook)
    } else {
      throw createError(400)
    }
  }

  async testFunctionTrigger(req, res, next) {
    const subscribers = await this.#serviceRepository.getAllSubscribersOnMovieHook(req, res)

    subscribers.forEach(async (subscriber) => {
      if (this.#isValidURL(subscriber.url)) {
        await fetch(subscriber.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(req.body)
        }
        )
      }
    })
  }

  #isValidURL(url) {
    try {
      return Boolean(new URL(url))
    } catch (err) {
      return false
    }
  }
}
