const { selectEndpoints } = require("../models/api-model");

exports.getEndpoints = (request, response, next) => {
  selectEndpoints()
    .then((endpoints) => {
      response.status(200).send({ endpoints });
    })
    .catch((err) => {
      next(err);
    });
};
