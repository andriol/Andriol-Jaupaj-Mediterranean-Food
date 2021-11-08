const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
    const token = await req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisisasecretformyapp");
    console.log(decoded);
    if (!decoded) {
      throw new Error();
    }

    req.token = token;
    req.decoded = decoded;
    console.log(req.decoded);

    next();
  } catch (err) {
    res.status(401).send({ error: "please authenticate" });
  }
};

const signJWTToken = (user) => {
  const token = jwt.sign({ id: user.id }, "thisisasecretformyapp");
  return token;
};
module.exports = {
  auth,
  signJWTToken,
};
