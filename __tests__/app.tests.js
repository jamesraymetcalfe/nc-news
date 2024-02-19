const app = require("../app");
const db = require("../db/connection");
const request = require("supertest");
const data = require("../db/data/test-data");
const seed = require("../db/seeds/seed");
const endpointsJSON = require('../endpoints.json')

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("/api", () => {
  test("GET 200: sends an object describing all the available endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        const {endpoints} = response.body;
        expect(endpoints).toMatchObject(endpointsJSON)
          });
        });
      });

describe("/api/topics", () => {
  test("GET 200: sends an array of all the topics to the client", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        const { topics } = response.body;
        expect(topics).toHaveLength(3);
        topics.forEach((topic) => {
          expect(topic).toMatchObject({
            description: expect.any(String),
            slug: expect.any(String),
          });
        });
      });
  });
  test("a route that does not exist returns '404 path not found' error", () => {
    return request(app)
      .get("/fjfjfjd")
      .expect(404)
      .then((response) => {
        const error = response.body.msg;
        expect(error).toBe("path not found");
      });
  });
});
