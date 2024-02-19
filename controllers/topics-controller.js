const { selectAllTopics } = require("../models/topics-model");

exports.getAllTopics = (request, response, next) => {
  selectAllTopics().then((topics) => {
    response.status(200).send({ topics });
  });
};
