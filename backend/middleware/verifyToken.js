const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  let token = req.headers["authorization"];
  const JWT_SECRET = process.env.JWT_SECRET_KEY;
  if (!token) {
    return res.json({
      code: -2,
      message: "Access denied. No token provided.",
    });
  }
  try {
    token = token.split(' ')[1]
    jwt.verify(token, JWT_SECRET, async (err, payload) => {
      if (err) {
        console.log(err)
        return res.json({ code: -2, message: "Failed to authenticate token." });
      } else {
        req.payload = payload;
        next();
      }
    });
  } catch (err) {
    console.log("Caught error in token verification middleware: " + err.message);
    return res.json({ code: -2, message: "Failed to authenticate token." });
  }
};

module.exports = verifyToken;
