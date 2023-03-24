export const createLink = (req, path) => {
  return `${req.protocol}://${req.get('host')}/api/v1${path}`
}

export const getLinks = (req, movie) => {
  console.log(req.user)
  // if (req.user.id === createdByUserId) {
  return [
    // { rel: 'self', method: req.method, href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
    { rel: 'self', method: 'GET', href: `${req.protocol}://${req.get('host')}${req.originalUrl}/${movie.id}` }
  ]
  // }
}

export const loggedInUserGetLinks = (req, movie) => {
  return [
    { rel: 'create', method: 'POST', href: `${req.protocol}://${req.get('host')}${req.originalUrl}/${movie.id}` },
    { rel: 'update', method: 'PATCH', href: `${req.protocol}://${req.get('host')}${req.originalUrl}/${movie.id}`, description: 'Partially update this movie' },
    { rel: 'update', method: 'PUT', href: `${req.protocol}://${req.get('host')}${req.originalUrl}/${movie.id}`, description: 'Update all in this movie' },
    { rel: 'delete', method: 'DELETE', href: `${req.protocol}://${req.get('host')}${req.originalUrl}/${movie.id}` }
  ]
}

export const baseLinks = (req) => {
  return [
    { rel: 'collection', method: 'GET', href: `${req.protocol}://${req.get('host')}/api/v1/` },
    { rel: 'login', method: 'POST', href: `${req.protocol}://${req.get('host')}/api/v1/user/login`, description: 'Login user' },
    { rel: 'register', method: 'POST', href: `${req.protocol}://${req.get('host')}/api/v1/user/register`, description: 'Register user' }
  ]
}
