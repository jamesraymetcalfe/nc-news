const db = require("../db/connection");

exports.selectAllArticles = () => {
  return db
    .query(
      `SELECT articles.author, title, articles.article_id, topic, articles.created_at, articles.votes, article_img_url,
  COUNT (comments.comment_id) AS comment_count
  FROM articles
  LEFT JOIN comments
  ON articles.article_id = comments.article_id
  GROUP BY articles.article_id
  ORDER BY articles.created_at DESC;`
    )
    .then((data) => {
      return data.rows;
    });
};

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
