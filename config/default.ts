export default {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  saltWorkFactor: 10,
  privateKey: process.env.PRIVATE_KEY,
  publicKey: process.env.PUBLIC_KEY,
  accessTokenTtl: '15m',
  refreshTokenTtl: '1y',
};
