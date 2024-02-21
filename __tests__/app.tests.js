const app = require("../app");
const db = require("../db/connection");
const request = require("supertest");
const data = require("../db/data/test-data");
const seed = require("../db/seeds/seed");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("/api", () => {
  test("GET 200: sends an object describing all the available endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        const { endpoints } = response.body;
        for (const endpoint in endpoints) {
          expect(endpoints[endpoint]).toMatchObject({
            description: expect.any(String),
            queries: expect.any(Array),
            exampleResponse: expect.any(Object),
          });
        }
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
});

describe("/api/articles/:articles_id", () => {
  test("GET: 200 sends a single article to the client", () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then((response) => {
        const { article } = response.body;
        expect(article).toMatchObject({
          article_id: 2,
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          article_img_url: expect.any(String),
        });
      });
  });
  test("GET:404 sends an appropriate status and error message when given a valid but non-existent id", () => {
    return request(app)
      .get("/api/articles/9999")
      .expect(404)
      .then((response) => {
        const { msg } = response.body;
        expect(msg).toBe("article does not exist");
      });
  });
  test("GET:400 sends an appropriate status and error message when given an invalid id", () => {
    return request(app)
      .get("/api/articles/forklift")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
});

describe("/api/articles", () => {
  test("GET 200: sends an array of all the articles to the client", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const { articles } = response.body;
        expect(articles).toHaveLength(13);
        articles.forEach((article) => {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(String),
          });
        });
      });
  });
  test("GET 200: returned array is sorted by date in descending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const { articles } = response.body;
        expect(articles).toBeSortedBy("created_at", { descending: true });
      });
  });
});

describe("/api/articles/:article_id/comments", () => {
  test("GET: 200 sends an array of comments for the given article_id with the most recent first", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((response) => {
        const { comments } = response.body;
        expect(comments).toHaveLength(11);
        expect(comments).toBeSortedBy("created_at", { descending: true });
        comments.forEach((comment) => {
          expect(comment).toMatchObject({
            article_id: 1,
            comment_id: expect.any(Number),
            author: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
          });
        });
      });
  });
  test("GET 200: sends an empty array when no comments have been made at valid article_id", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then((response) => {
        const { comments } = response.body;
        expect(comments).toHaveLength(0);
      });
  });
  test("GET:404 sends an appropriate status and error message when given a valid but non-existent id", () => {
    return request(app)
      .get("/api/articles/9999/comments")
      .expect(400)
      .then((response) => {
        const { msg } = response.body;
        expect(msg).toBe("article_id 9999 does not exist");
      });
  });
  test("GET:400 sends an appropriate status and error message when given an invalid id", () => {
    return request(app)
      .get("/api/articles/forklift/comments")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
  test("POST:201 inserts a new comment to the db and sends the comment back to the client", () => {
    const newComment = { username: "icellusedkars", body: "nice article!" };
    return request(app)
      .post("/api/articles/2/comments")
      .send(newComment)
      .expect(201)
      .then((response) => {
        const { comment } = response.body;
        expect(comment).toMatchObject({
          article_id: 2,
          comment_id: expect.any(Number),
          author: "icellusedkars",
          body: "nice article!",
          created_at: expect.any(String),
          votes: 0,
        });
      });
  });
  test("POST:400 sends an appropriate status and error message when given a valid but non-existent id", () => {
    const newComment = { username: "icellusedkars", body: "nice article!" };
    return request(app)
      .post("/api/articles/9999/comments")
      .send(newComment)
      .expect(400)
      .then((response) => {
        const { msg } = response.body;
        expect(msg).toBe("article_id 9999 does not exist");
      });
  });
  test("POST:400 sends an appropriate status and error message when given an invalid id", () => {
    const newComment = { username: "icellusedkars", body: "nice article!" };
    return request(app)
      .post("/api/articles/forklift/comments")
      .send(newComment)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
  test("POST:400 sends an appropriate status and error when new comment is missing a required field", () => {
    const newComment = { body: "nice article!" };
    return request(app)
      .post("/api/articles/2/comments")
      .send(newComment)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
  test("POST:400 sends an appropriate status and error when comment body is an empty string", () => {
    const newComment = { username: "icellusedkars", body: "" };
    return request(app)
      .post("/api/articles/2/comments")
      .send(newComment)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
  test("POST:400 sends an appropriate status and error when user does not exist", () => {
    const newComment = { username: "jimmy_met", body: "nice article!" };
    return request(app)
      .post("/api/articles/2/comments")
      .send(newComment)
      .expect(400)
      .then((response) => {
        const {msg} = response.body
        expect(msg).toBe('username jimmy_met does not exist');
      });
  });
});

describe("GET 404 - invalid endpoint", () => {
  test("GET:404 send an appropriate status and error message when sent a non existent route", () => {
    return request(app)
      .get("/fjfjfjd")
      .expect(404)
      .then((response) => {
        const error = response.body.msg;
        expect(error).toBe("path not found");
      });
  });
});
