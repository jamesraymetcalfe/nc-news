exports.handleInvalidEndpoints = (request, response, next) => {
  response.status(404).send({ msg: "path not found" });
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
  next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "bad request" });
  }
  next(err);
};

exports.handleServerErrors = (err, request, response, next) => {
  response.status(500).send({ msg: "internal server error" });
};
