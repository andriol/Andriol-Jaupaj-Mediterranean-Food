const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(401).json({
      success: false,
      message: "This route requires authorization header",
    });

  if (req.headers.authorization.indexOf("Bearer") === -1)
    return res
      .status(401)
      .json({ success: false, message: "This route requires Bearer token" });

  const authToken = req.headers.authorization.split(" ")[1];

  jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res
        .status(401)
        .json({ success: false, message: "The token is invalid" });

    req.jwtDecoded = decoded;
    next();
  });
};

// our naive "DB" of the users
const users = {
  daniil: {
    name: "Daniil M",
    password: "123",
  },

  andy: {
    name: "Andriol Jaupaj",
    password: "345",
  },
  candy: {
    name: "candy",
    password: "543",
  },
};

router.post("/", (req, res) => {
  const { username, password } = req.body;

  const user = users[username];

  if (!user)
    return res.status(403).json({ success: false, message: "User not found" });

  if (user && user.password === password) {
    const token = jwt.sign(
      {
        name: user.name,
        exp: Math.floor(Date.now() / 1000) + 600,
        username,
        loginTime: Date.now(),
      },
      process.env.JWT_SECRET
    );

    return res.status(200).json({ token });
  } else {
    return res.status(403).json({
      success: false,
      message: "Username/password combination is wrong",
    });
  }
});

router.get("/", authorize, (req, res) => {
  res.json({
    tokenInfo: req.jwtDecoded,
    accountInfo: {
      performanceLevel: "7.5",
      reviewDate: "09/15/2020",
    },
  });
});
module.exports = router;
