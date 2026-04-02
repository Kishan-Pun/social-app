const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    // Get token from header
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ msg: "No token, access denied" });
    }

    // Remove "Bearer "
    const actualToken = token.replace("Bearer ", "");

    // Verify token
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    req.user = decoded; // { id: userId }

    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};