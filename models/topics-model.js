const db = require("../db/connection");
const fs = require("fs/promises");

exports.selectEndpoints = () => {
  return fs.readFile(`${__dirname}/../endpoints.json`, "utf8").then((data) => {
    const endpoints = JSON.parse(data);
    return endpoints;
  });
};

exports.selectAllTopics = () => {
  return db.query("SELECT * FROM topics;").then((result) => {
    return result.rows;
  });
};
