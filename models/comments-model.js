const db = require("../db/connection");
const { checkExists } = require("../utils");

exports.selectCommentsByArticleID = (article_id) => {
  return checkExists("articles", "article_id", article_id)
    .then(() => {
      return db.query(
        "SELECT * FROM comments WHERE comments.article_id = $1 ORDER BY comments.created_at DESC;",
        [article_id]
      );
    })
    .then((data) => {
      return data.rows;
    });
};

exports.insertComment = (article_id, { username, body }) => {
  if (body === "" || username === undefined) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }
  return checkExists("articles", "article_id", article_id)
    .then(() => {
      return checkExists("users", "username", username);
    })
    .then(() => {
      return db.query(
        `INSERT INTO comments (article_id, author, body, created_at, votes)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP, 0)
      RETURNING *;`,
        [article_id, username, body]
      );
    })
    .then((data) => {
      return data.rows[0];
    });
};

exports.removeCommentByID = (comment_id) => {
  return db
    .query("DELETE FROM comments WHERE comment_id = $1 RETURNING *;", [
      comment_id,
    ])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "comment does not exist" });
      }
    });
};
