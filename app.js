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
} = require("./errors/errors");
const { getArticlesByID } = require("./controllers/articles-controller");

app.get("/api", getEndpoints);

app.get("/api/topics", getAllTopics);

app.get("/api/articles/:articles_id", getArticlesByID);

app.all("/*", (request, response, next) => {
  response.status(404).send({ msg: "path not found" });
});

app.use(handleCustomErrors);

app.use(handlePsqlErrors);

app.use(handleServerErrors);

module.exports = app;
