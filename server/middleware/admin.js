module.exports = function(req, res, next) {
  // 401 Unauthorized
  // 403 Forbidden.

  // Use this for a protected Admin route

  if (!req.user.isAdmin) return res.status(403).send('Access Denied.')

  next()
}
