const db = require("../db/connection");

exports.selectCommentsByArticleID = (article_id) => {
  return db
    .query(
      "SELECT * FROM comments WHERE comments.article_id = $1 ORDER BY comments.created_at DESC;",
      [article_id]
    )
    .then((data) => {
      return data.rows;
    });
};

exports.insertComment = (article_id, { username, body }) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then((data) => {
      if (data.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "article does not exist" });
      }
      return db.query(
        `INSERT INTO comments (article_id, author, body, created_at, votes)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP, 0)
      RETURNING *;`,
        [article_id, username, body]
      );
    })
    .then((data) => {
      if (data.rows[0].body === "") {
        return Promise.reject({ status: 400, msg: "bad request" });
      }
      return data.rows[0];
    });
};
