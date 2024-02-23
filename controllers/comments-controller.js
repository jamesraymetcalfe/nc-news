const { removeCommentByID } = require("../models/comments-model");

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
