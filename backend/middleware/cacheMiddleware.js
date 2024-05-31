const cache = require("./cacheManagement");

const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;
  const cachedData = cache.getFromCache(key);
  if (cachedData) {
    return res.json({
      code: 1,
      data: cachedData,
      message: "Data fetched successfully",
    });
  }
  next();
};

module.exports = cacheMiddleware;
