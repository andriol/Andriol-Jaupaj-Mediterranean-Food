const jwt = require("jsonwebtoken");

module.exports = {
  validateUser: (req, res, next) => {
    if (req.body.username.length < 6) {
      return res.status(400).json({
        messsage: "Username must be at least 3 characters",
      });
    }
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    next();
  },
};
