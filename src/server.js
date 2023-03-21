/**
 * The starting point of the application.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import { container } from './config/bootstrap.js'
import express from 'express'
import helmet from 'helmet'
import logger from 'morgan'
import { router } from './routes/router.js'
import { connectDB } from './config/mongoose.js'

try {
  await connectDB()

  const app = express()

  app.set('container', container) // gör att vi kommer åt containern i router. we store container in container.

  // Set various HTTP headers to make the application little more secure (https://www.npmjs.com/package/helmet).
  app.use(helmet())

  // Set up a morgan logger using the dev format for log entries.
  app.use(logger('dev'))

  // Parse requests of the content type application/json.
  app.use(express.json())

  // app.enable('trust proxy')

  // Register routes.
  app.use('/', router)

  // Error handler.
  app.use(function (err, req, res, next) {
    if (err.status === 400) {
      return res
        .status(400)
        .json({
          status_code: 400,
          message: 'The request cannot or will not be processed due to something that is perceived to be a client error (for example, validation error).'
        })
    } else if (err.status === 401) {
      return res
        .status(401)
        .json({
          status_code: 401,
          message: 'Credentials invalid or not provided.'
        })
    } else if (err.status === 409) {
      return res
        .sendStatus(409)
    } else if (err.status === 500) {
      return res
        .status(500)
        .json({
          status_code: 500,
          message: 'An unexpected condition was encountered.'
        })
    }

    if (req.app.get('env') !== 'development') {
      return res
        .status(err.status)
        .json({
          status: err.status,
          message: err.message
        })
    }
  })

  // Starts the HTTP server listening for connections.
  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
} catch (err) {
  console.error(err)
  process.exitCode = 1
}
