require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE === 'production',
  port: process.env.PORT,
  path: process.env.PATH_URI,
};

module.exports = { config };
