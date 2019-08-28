// try catch handler for routes

module.exports = function asyncMiddleware(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res)
    } catch (ex) {
      next(ex)
    }
  }
}
