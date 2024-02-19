const { selectArticlesByID } = require("../models/articles-model");

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
