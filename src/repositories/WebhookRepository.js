import { HookMovie } from '../models/hookmovie.js'

export class WebhookRepository {
  async registerNewMovieHook(req, res, subscriberForHook) {
    await subscriberForHook.save()
  }

  async getAllSubscribersOnMovieHook(req, res) {
    return HookMovie.find()
  }
}
