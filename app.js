const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router");
const {
  handleServerErrors,
  handleCustomErrors,
  handlePsqlErrors,
  handleInvalidEndpoints,
} = require("./Errors/errors");

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", handleInvalidEndpoints);

app.use(handleCustomErrors);

app.use(handlePsqlErrors);

app.use(handleServerErrors);

module.exports = app;
