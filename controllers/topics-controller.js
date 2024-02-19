const { selectAllTopics, selectEndpoints } = require("../models/topics-model");

exports.getEndpoints = (request, response, next) => {
  selectEndpoints()
    .then((endpoints) => {
      response.status(200).send({ endpoints });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAllTopics = (request, response, next) => {
  selectAllTopics()
    .then((topics) => {
      response.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};
