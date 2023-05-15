/**
 * WebhookService.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import { WebhookRepository } from '../repositories/WebhookRepository.js'
import fetch from 'node-fetch'
import createError from 'http-errors'

/**
 * WebhookService.
 */
export class WebhookService {
  #serviceRepository

  /**
   * Contructor for the WebhookRepository in the API.
   *
   * @param { object } service - WebhookService for the API.
   */
  constructor (service = new WebhookRepository()) {
    this.#serviceRepository = service
  }

  /**
   * Register new movie hook.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {string} subscriberForHook - subscriber.
   */
  registerNewSubscriberOnMovieHook (req, res, subscriberForHook) {
    if (this.#isValidURL(subscriberForHook.url)) {
      this.#serviceRepository.registerNewSubscriberOnMovieHook(req, res, subscriberForHook)
    } else {
      throw createError(400)
    }
  }

  /**
   * Trigger Moviehook.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async triggerMovieHook (req, res, next) {
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

  async triggerMovieHookTest (movie) {
    const subscribers = await this.#serviceRepository.getAllSubscribersOnMovieHook()
    console.log(subscribers)

    subscribers.forEach(async (subscriber) => {
      if (this.#isValidURL(subscriber.url)) {
        await fetch(subscriber.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(movie)
        }
        )
      }
    })
  }

  /**
   * Get all movies.
   *
   * @param {object} url - Express request object.
   * @returns {boolean} - true of false.
   */
  #isValidURL (url) {
    try {
      return Boolean(new URL(url))
    } catch (err) {
      return false
    }
  }
}
