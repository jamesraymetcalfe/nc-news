const db = require("../db/connection");
const { checkExists } = require("../utils");

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
