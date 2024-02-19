const express = require("express");
const app = express();
const { getAllTopics } = require("./controllers/topics-controller");
const { handleServerErrors } = require("./errors/errors");

app.use(express.json());

app.get("/api/topics", getAllTopics);

app.all("/*", (request, response, next) => {
  response.status(404).send({ msg: "path not found" });
});

app.use(handleServerErrors);

module.exports = app;
