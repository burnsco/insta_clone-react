module.exports = {
  notFound: (req, res, next) => {
    res.status(404)
    const error = new Error('Not found - ' + req.originalUrl)
    next(error)
  },
  other: (err, req, res) => {
    res.status(res.statusCode || 500)
    res.json({ message: err.message, stack: err.stack })
  }
}
