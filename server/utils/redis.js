const { createClient } = require("redis");

const redisClient = createClient();

redisClient.on("error", (err) => {
  console.log("Redis Client Error", err);
  process.exit(1);
});

async function connectRedis() {
  await redisClient.connect();
}

connectRedis();

module.exports = redisClient;
