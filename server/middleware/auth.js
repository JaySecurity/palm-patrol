const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
  let token = req.get('Authorization') || req.query.token || req.body.token;
  console.log(token);
  if (token) {
    token = token.split(' ')[1];
    jwt.verify(token, JWT_SECRET, function (err, decoded) {
      if (err) {
        return res.status(401).json({ verified: false });
      } else {
        // It's a valid token, so add user to req
        req.user = decoded.user;
        next();
      }
    });
  } else {
    return res.status(401).json({ verified: false });
  }
};
