
function isAdmin(req, res, next) {
  if (req.user.role == 'admin') {
    next()
  } else {
    res
      .status(401)
      .json({
        msg: 'unauthorized access'
      })
  }
}

module.exports = isAdmin