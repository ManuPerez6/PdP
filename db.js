import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: "localhost",
  user: "Manu",
  password: "Moro6177",
  database: "repositorios",
  connectionLimit: 5,
});

export default pool;
