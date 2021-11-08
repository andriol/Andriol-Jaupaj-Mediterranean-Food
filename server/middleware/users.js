const jwt = require("jsonwebtoken");

module.exports = {
  validateUser: (req, res, next) => {
    if (req.body.username || req.body.username < 6) {
      return res.status(400).json({
        messsage: "Username must be at least 3 characters",
      });
    }
    if (!req.body.password || req.body.password < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }
    if (!req.body.password_two || req.body.password !== req.body.password_two) {
      return res.status(400).json({ message: "Both password must match" });
    }
    if (username === req.body.username) {
      return res.status(409).json({ message: "username aleady is in use" });
    }
    next();
  },
};
