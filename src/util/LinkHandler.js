
/**
 * Creates a link for self only.
 *
 * @param {object} req - Express request object.
 * @param {object} movie - the specific movie.
 * @returns {string} - returns a link.
 */
export const getLinks = (req, movie) => {
  return [
    { rel: 'self', method: 'GET', href: `${req.protocol}://${req.get('host')}${req.originalUrl}/${movie.id}` }
  ]
}

/**
 * Creates links for logged in user get links.
 *
 * @param {object} req - Express request object.
 * @param {object} movie - the specific movie.
 * @returns {string} - returns a link.
 */
export const loggedInUserGetLinks = (req, movie) => {
  const links = [
    { rel: 'self', method: 'GET', href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
    { rel: 'update', method: 'PATCH', href: `${req.protocol}://${req.get('host')}${req.originalUrl}`, description: 'Partially update this movie' },
    { rel: 'update', method: 'PUT', href: `${req.protocol}://${req.get('host')}${req.originalUrl}`, description: 'Update all in this movie' },
    { rel: 'delete', method: 'DELETE', href: `${req.protocol}://${req.get('host')}${req.originalUrl}` }
  ]

  return links
}

/**
 * Creates baselinks.
 *
 * @param {object} req - Express request object.
 * @returns {string} - returns a link.
 */
export const baseLinks = (req) => {
  return [
    { rel: 'collection', method: 'GET', href: `${req.protocol}://${req.get('host')}/api/v1/movie` },
    { rel: 'create', method: 'POST', href: `${req.protocol}://${req.get('host')}/api/v1/movie` },
    { rel: 'login', method: 'POST', href: `${req.protocol}://${req.get('host')}/api/v1/user/login`, description: 'Login user' },
    { rel: 'register', method: 'POST', href: `${req.protocol}://${req.get('host')}/api/v1/user/register`, description: 'Register user' }
  ]
}
