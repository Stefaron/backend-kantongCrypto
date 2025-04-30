import { Pool } from "pg";

const pool = new Pool({
  user: "evan",
  host: "localhost",
  database: "kantongcrypto",
  password: "",
  port: 5432,
});

export default pool;
