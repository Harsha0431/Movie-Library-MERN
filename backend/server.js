const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const mongoose = require("mongoose");

//Middleware
const verifyToken = require("./middleware/verifyToken");

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

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const authRouter = require("./router/authRouter");
app.use("/api/auth", authRouter);

// Verify Token
app.get("/api/verify", verifyToken, (request, response) => {
  return response.json({
    code: 1,
    message: "Login successful",
    data: request.payload,
  });
});

// Get top movies list with root search query
const cacheMiddleware = require("./middleware/cacheMiddleware");
const cacheManagement = require('./middleware/cacheManagement');

const OMDb_API_KEY = process.env.OMDb_API_KEY;
const OMDb_API_URL = process.env.OMDb_URI;
const OMDb_TOP_LIST_SEED = process.env.OMDb_TOP_LIST_SEED;
app.get("/api/top/movies", cacheMiddleware, async (request, response) => {
  let movieList = [];
  const requestPage = parseInt(request.query.page) || 1;
  let requestLimit = parseInt(request.query.limit) || 10;
  if (requestPage == 1) {
    requestLimit = 20;
  }
  let page = requestPage;
  while (movieList.length < requestLimit) {
    const list = await getTopMovieList(page);
    if (list.length > 0) {
      movieList = movieList.concat(list);
      page += 1;
    } else break;
  }
  if(requestPage==1)
    cacheManagement.setInCache(request.originalUrl, movieList);
  response.json({ code: 1, message: "Top movies list fetched", data: movieList, page: page });
});

async function getTopMovieList(page = 1) {
  const response = await fetch(
    `${OMDb_API_URL}${OMDb_API_KEY}&s=${OMDb_TOP_LIST_SEED}&type=movie&page=${page}`
  );
  const data = await response.json();
  if (data.Response == "True") return data.Search;
  return [];
}

// Library Routes
const libraryRouter = require('./router/libraryRouter');
app.use('/api/library', verifyToken,libraryRouter);
