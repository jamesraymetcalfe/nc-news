const { sort } = require("../db/data/test-data/users");
const {
  selectArticlesByID,
  selectAllArticles,
  updateArticleByID,
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
