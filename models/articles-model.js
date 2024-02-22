const db = require("../db/connection");
const { checkExists } = require("../utils");

exports.selectAllArticles = (topic = null) => {
  if (topic === null) {
    let queryString = `SELECT articles.author, title, articles.article_id, topic, articles.created_at, articles.votes, article_img_url,
    COUNT (comments.comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id `;

    const queryVals = [];

    if (topic) {
      queryString += `WHERE topic = $1 `;
      queryVals.push(topic);
    }

    queryString += `GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;`;

    return db.query(queryString, queryVals).then((data) => {
      return data.rows;
    });
  } else {
    return checkExists("topics", "slug", topic).then(() => {
      let queryString = `SELECT articles.author, title, articles.article_id, topic, articles.created_at, articles.votes, article_img_url,
  COUNT (comments.comment_id) AS comment_count
  FROM articles
  LEFT JOIN comments
  ON articles.article_id = comments.article_id `;

      const queryVals = [];

      if (topic) {
        queryString += `WHERE topic = $1 `;
        queryVals.push(topic);
      }

      queryString += `GROUP BY articles.article_id
  ORDER BY articles.created_at DESC;`;

      return db.query(queryString, queryVals).then((data) => {
        return data.rows;
      });
    });
  }
};

exports.selectArticlesByID = (articles_id) => {
  return db
    .query(
      `SELECT articles.*, COUNT (comments.comment_id) AS comment_count 
      FROM articles 
      LEFT JOIN comments 
      ON articles.article_id = comments.article_id 
      WHERE articles.article_id = $1 
      GROUP BY articles.article_id`,
      [articles_id]
    )
    .then((data) => {
      if (data.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "article does not exist" });
      }
      return data.rows[0];
    });
};

exports.updateArticleByID = (inc_votes, articles_id) => {
  return db
    .query(
      `UPDATE articles
  SET votes = votes + $1
  WHERE article_id = $2
  RETURNING *;`,
      [inc_votes, articles_id]
    )
    .then((data) => {
      if (data.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "article does not exist" });
      }
      return data.rows[0];
    });
};
