import jwt from 'jsonwebtoken'
import createError from 'http-errors'

export const authenticateJWT = (req, res, next) => {
  try {
    console.log(req.body)
    const publicKey = Buffer.from(process.env.ACCESS_TOKEN_PUBLIC, 'base64')
    console.log(publicKey)
    console.log(req.headers)

    const [authenticationScheme, token] = req.headers.authorization?.split(' ')

    if (authenticationScheme !== 'Bearer') {
      throw new Error('Invalid authentication scheme.')
    }

    const payload = jwt.verify(token, publicKey)
    req.user = {
      username: payload.username,
      id: payload.id
    }

    next()
  } catch (err) {
    const error = createError(401)
    next(error)
  }
}