const {
  selectCommentsByArticleID,
  insertComment,
} = require("../models/comments-model");
const { selectArticlesByID } = require("../models/articles-model");

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
