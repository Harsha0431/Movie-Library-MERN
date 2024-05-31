const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const mongoose = require("mongoose");

//Middleware
const verifyToken = require('./middleware/verifyToken');


dotenv.config();

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const MONGODB_URI = process.env.MONGODB_URI ;

mongoose
  .connect(MONGODB_URI, {
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const authRouter = require('./router/authRouter');
app.use('/api/auth', authRouter);

// Verify Token
app.get('/api/verify', verifyToken, (request, response) => {
  return response.json({ code: 1, message: 'Login successful' ,data: request.payload });
});