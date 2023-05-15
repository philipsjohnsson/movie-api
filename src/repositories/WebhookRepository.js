/**
 * WebhookRepository.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import { HookMovie } from '../models/hookmovie.js'

/**
 * WebhookRepository.
 */
export class WebhookRepository {
  /**
   * Register new movie hook.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {string} subscriberForHook - subscriber.
   */
  async registerNewSubscriberOnMovieHook (req, res, subscriberForHook) {
    await subscriberForHook.save()
  }

  /**
   * Get all subscribers.
   *
   */
  async getAllSubscribersOnMovieHook () {
    return HookMovie.find()
  }
}
