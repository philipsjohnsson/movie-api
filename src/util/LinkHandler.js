export const createLink = (req, path) => {
  return `${req.protocol}://${req.get('host')}/api/v1${path}`
}
