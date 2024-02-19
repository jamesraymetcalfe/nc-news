const db = require("../db/connection");

exports.selectArticlesByID = (articles_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [articles_id])
    .then((data) => {
      if (data.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "article does not exist" });
      }
      return data.rows[0];
    });
};
