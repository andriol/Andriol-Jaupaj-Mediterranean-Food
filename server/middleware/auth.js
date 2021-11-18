const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = await req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    if (!decoded) {
      throw new Error();
    }

    req.token = token;
    req.decoded = decoded;
    console.log(req.decoded.id);

    next();
  } catch (err) {
    res.status(401).send({ error: "please authenticate" });
  }
};

const signJWTToken = (user) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  return token;
};
module.exports = {
  auth,
  signJWTToken,
};
