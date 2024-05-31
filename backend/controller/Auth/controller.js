const UserModel = require("../../models/UserModel");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET_KEY;

async function handleLogin(request, response) {
  try {
    const { email, password } = request.body || null;
    if (email == null || password == null) {
      return response.json({
        code: 0,
        message: "Invalid data. Failed to login",
      });
    }
      const user = await UserModel.findOne({ email: email }) || null;
      if (user == null) {
          return response.json({ code: -1, message: "Sorry, we couldn't find you email." });
      }
      if (user.password !== password) {
          return response.json({ code: 0, message: "Invalid password" });
      }
      const payload = {
        _id: user._id.toString(),
        name: user.name,
        email: email,
      };
      const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: "7d",
        algorithm: "HS256",
      });
      const data = { ...payload, token: token };
      return response.json({ code: 1, message: 'Login successful', data: data });
  } catch (err) {
    console.log("Caught error in login: " + err.message);
    return response.json({ code: -1, message: "Failed to login" });
  }
}

async function handleSignup(request, response) {
  try {
    const { name, email, password } = request.body || null;
    if (name == null || email == null || password == null) {
      return response.json({
        code: 0,
        message: "Invalid data. Failed to sign up",
      });
    }
    const user = new UserModel({
      name: name,
      email: email,
      password: password,
    });
    await user.save();
    return response.json({
      code: 1,
      message: "Sign up successful",
    });
  } catch (err) {
    console.log("Caught error in sign up: " + err.message);
    if (err.message.includes("email_1 dup key")) {
      return response.json({
        code: -1,
        message: "Email already in use. Please choose another.",
      });
    }
    return response.json({ code: -1, message: "Failed to sign up" });
  }
}

module.exports = {
  handleLogin,
  handleSignup,
};
