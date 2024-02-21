const express = require("express");
const app = express();
const {
  getAllTopics,
  getEndpoints,
} = require("./controllers/topics-controller");
const {
  handleServerErrors,
  handleCustomErrors,
  handlePsqlErrors,
  handleInvalidEndpoints,
} = require("./controllers/errors-controller");
const {
  getArticlesByID,
  getAllArticles,
  patchArticleByID,
} = require("./controllers/articles-controller");
const {
  getCommentsByArticleID,
  postComment,
  deleteCommentByID,
} = require("./controllers/comments-controller");

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/topics", getAllTopics);

app.get("/api/articles", getAllArticles);

app.get("/api/articles/:articles_id", getArticlesByID);

app.patch("/api/articles/:articles_id", patchArticleByID);

app.get("/api/articles/:article_id/comments", getCommentsByArticleID);

app.post("/api/articles/:article_id/comments", postComment);

app.delete("/api/comments/:comment_id", deleteCommentByID);

app.all("/*", handleInvalidEndpoints);

app.use(handleCustomErrors);

app.use(handlePsqlErrors);

app.use(handleServerErrors);

module.exports = app;
