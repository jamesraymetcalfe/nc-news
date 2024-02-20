const {
  selectArticlesByID,
  selectAllArticles,
} = require("../models/articles-model");

exports.getAllArticles = (request, response, next) => {
  selectAllArticles()
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