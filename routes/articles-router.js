const articlesRouter = require("express").Router();

const {
  getAllArticles,
  getArticlesByID,
  patchArticleByID,
  getCommentsByArticleID,
  postCommentToArticle,
} = require("../controllers/articles-controller");

articlesRouter.route("/").get(getAllArticles);

articlesRouter
  .route("/:articles_id")
  .get(getArticlesByID)
  .patch(patchArticleByID);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleID)
  .post(postCommentToArticle);

module.exports = articlesRouter;
