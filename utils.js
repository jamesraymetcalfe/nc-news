const pgFormat = require("pg-format");
const db = require("./db/connection");

exports.checkExists = (table, column, value) => {
  const queryStr = pgFormat("SELECT * FROM %I WHERE %I = $1;", table, column);
  return db.query(queryStr, [value]).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: `${value} does not exist in column - ${column}`,
      });
    }
  });
};