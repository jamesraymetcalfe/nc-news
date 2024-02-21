const { selectAllUsers } = require("../models/users-model");

exports.getAllUsers = (request, response, next) => {
  selectAllUsers()
    .then((users) => {
      response.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};
