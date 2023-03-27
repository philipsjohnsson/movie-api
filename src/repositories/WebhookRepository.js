import { HookMovie } from '../models/hookmovie.js'

export class WebhookRepository {
  async registerNewMovieHook(req, res, subscriberForHook) {
    console.log('TEST TEST, inside of webhookrepository')
    await subscriberForHook.save()
  }

  async getAllSubscribersOnMovieHook(req, res) {
    return HookMovie.find()
  }
}
