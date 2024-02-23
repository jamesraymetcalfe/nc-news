const {
  selectArticlesByID,
  selectAllArticles,
  updateArticleByID,
  selectCommentsByArticleID,
  insertCommentToArticle,
} = require("../models/articles-model");

exports.getAllArticles = (request, response, next) => {
  const { topic, sort_by, order } = request.query;
  selectAllArticles(topic, sort_by, order)
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticlesByID = (request, response, next) => {
  const { articles_id } = request.params;
  selectArticlesByID(articles_id)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleByID = (request, response, next) => {
  const { articles_id } = request.params;
  const { inc_votes } = request.body;
  updateArticleByID(inc_votes, articles_id)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsByArticleID = (request, response, next) => {
  const { article_id } = request.params;
  selectCommentsByArticleID(article_id)
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCommentToArticle = (request, response, next) => {
  const { article_id } = request.params;
  const newComment = request.body;
  insertCommentToArticle(article_id, newComment)
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};
