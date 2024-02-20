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
} = require("./controllers/articles-controller");
const { getCommentsByArticleID } = require("./controllers/comments-controller");

app.get("/api", getEndpoints);

app.get("/api/topics", getAllTopics);

app.get("/api/articles", getAllArticles);

app.get("/api/articles/:articles_id", getArticlesByID);

app.get("/api/articles/:article_id/comments", getCommentsByArticleID)

app.all("/*", handleInvalidEndpoints);

app.use(handleCustomErrors);

app.use(handlePsqlErrors);

app.use(handleServerErrors);

module.exports = app;
