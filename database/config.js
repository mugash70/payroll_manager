// const { Pool } = require('pg');
// const  fs = require('fs');
// require("dotenv").config();
// const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
// const proConfig = {
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: true,
//     ca: fs.readFileSync(process.env.PG_SSL_CA).toString(),
//   },
// };
// const pool = new Pool({
//   connectionString:process.env.NODE_ENV == "prod" ? proConfig : devConfig,
// });

// module.exports = pool;
const { Pool } = require('pg');
const fs = require('fs');
require("dotenv").config();

const devConfig = {
  connectionString: `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`
};

const proConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync(process.env.PG_SSL_CA).toString(),
  },
};

const pool = new Pool(
  process.env.NODE_ENV === "prod" ? proConfig : devConfig
);

module.exports = pool;
