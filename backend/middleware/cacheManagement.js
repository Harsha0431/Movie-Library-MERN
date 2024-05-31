const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 7*24*3600 }); // TTL is set to 7days i.e. Expiration time

// Function to get data from cache
const getFromCache = (key) => {
  return cache.get(key);
};

// Function to set data in cache
const setInCache = (key, value) => {
  cache.set(key, value);
};

// Function to delete data from cache
const deleteFromCache = (key) => {
  cache.del(key);
};

module.exports = { getFromCache, setInCache, deleteFromCache };
