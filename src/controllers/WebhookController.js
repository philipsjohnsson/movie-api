/**
 * WebhookController.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import { HookMovie } from '../models/hookmovie.js'
import { WebhookService } from '../services/WebhookService.js'

/**
 * WebhookController for the API.
 */
export class WebhookController {
  #webhookService

  /**
   * Contructor for the MovieController in the API.
   *
   * @param { object } service - WebhookService for the API.
   */
  constructor (service = new WebhookService()) {
    this.#webhookService = service
  }

  /**
   * Subscribe on event create movie.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  subscribeOnCreateMovie (req, res, next) {
    try {
      this.#webhookService.registerNewSubscriberOnMovieHook(req, res, new HookMovie({
        url: req.body.url,
        events: req.body.events
      }))

      res
        .status(200)
        .json()
    } catch (err) {
      next(err)
    }
  }
}
