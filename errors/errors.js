// remember new errors above server error

exports.handleServerErrors = (err, request, response, next) => {
  response.status(500).send({ msg: "internal server error" });
};
