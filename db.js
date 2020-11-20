const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "241094Ali+",
  host: "localhost",
  port: 5432,
  database: "sheepbook",
});

module.exports = pool;
