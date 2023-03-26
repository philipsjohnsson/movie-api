export const createLink = (req, path) => {
  return `${req.protocol}://${req.get('host')}/api/v1${path}`
}

export const getLinks = (req, movie) => {
  // if (req.user.id === createdByUserId) {
  return [
    // { rel: 'self', method: req.method, href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
    { rel: 'self', method: 'GET', href: `${req.protocol}://${req.get('host')}${req.originalUrl}/${movie.id}` }
  ]
  // }
}

export const loggedInUserGetLinks = (req, movie) => {
  console.log(req.method)
  const links = [
    { rel: 'self', method: 'GET', href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
    { rel: 'update', method: 'PATCH', href: `${req.protocol}://${req.get('host')}${req.originalUrl}`, description: 'Partially update this movie' },
    { rel: 'update', method: 'PUT', href: `${req.protocol}://${req.get('host')}${req.originalUrl}`, description: 'Update all in this movie' },
    { rel: 'delete', method: 'DELETE', href: `${req.protocol}://${req.get('host')}${req.originalUrl}` }
  ]

  return links
}

export const baseLinks = (req) => {
  return [
    { rel: 'collection', method: 'GET', href: `${req.protocol}://${req.get('host')}/api/v1/movie` },
    { rel: 'create', method: 'POST', href: `${req.protocol}://${req.get('host')}/api/v1/movie` },
    { rel: 'login', method: 'POST', href: `${req.protocol}://${req.get('host')}/api/v1/user/login`, description: 'Login user' },
    { rel: 'register', method: 'POST', href: `${req.protocol}://${req.get('host')}/api/v1/user/register`, description: 'Register user' }
  ]
}
