const {
  selectCommentsByArticleID,
  insertComment,
} = require("../models/comments-model");
const { selectArticlesByID } = require("../models/articles-model");

exports.getCommentsByArticleID = (request, response, next) => {
  const { article_id } = request.params;
  const promises = [
    selectArticlesByID(article_id),
    selectCommentsByArticleID(article_id),
  ];
  Promise.all(promises)
    .then((resolutions) => {
      response.status(200).send({ comments: resolutions[1] });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComment = (request, response, next) => {
  const { article_id } = request.params;
  const newComment = request.body;
  insertComment(article_id, newComment)
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};
