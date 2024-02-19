const express = require("express");
const app = express();
const { getAllTopics, getEndpoints } = require("./controllers/topics-controller");
const { handleServerErrors } = require("./errors/errors");

app.get("/api", getEndpoints);

app.get("/api/topics", getAllTopics);

app.all("/*", (request, response, next) => {
  response.status(404).send({ msg: "path not found" });
});

app.use(handleServerErrors);

module.exports = app;
