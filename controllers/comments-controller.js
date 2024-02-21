const {
  selectCommentsByArticleID,
  insertComment,
  removeCommentByID,
} = require("../models/comments-model");
const { selectArticlesByID } = require("../models/articles-model");

exports.getCommentsByArticleID = (request, response, next) => {
  const { article_id } = request.params;
  const promises = [selectCommentsByArticleID(article_id)];

  if (article_id) {
    promises.push(selectArticlesByID(article_id));
  }
  Promise.all(promises)
    .then((resolutions) => {
      response.status(200).send({ comments: resolutions[0] });
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

exports.deleteCommentByID = (request, response, next) => {
  const { comment_id } = request.params;
  removeCommentByID(comment_id)
    .then(() => {
      response.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};
