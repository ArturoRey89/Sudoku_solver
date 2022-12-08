const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");
const Puzzles = require("../controllers/puzzle-strings.js").puzzlesAndSolutions;
chai.use(chaiHttp);

suite("Functional Tests", () => {
  suite("POST request to /api/solve", () => {
    test("Solve a puzzle with valid puzzle string", (done) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: Puzzles[2][0] })
        .end((err, res) => {
          assert.equal(res.body.solution, Puzzles[2][1]);
          done();
        });
    });
    test("Solve a puzzle with missing puzzle string", (done) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: "" })
        .end((err, res) => {
          assert.equal(res.body.error, "Required field missing");
          done();
        });
    });
    test("Solve a puzzle with invalid characters", (done) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({
          puzzle:
            "1.5..2.\\4..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
        })
        .end((err, res) => {
          assert.equal(res.body.error, "Invalid characters in puzzle");
          done();
        });
    });
    test("Solve a puzzle with incorrect length", (done) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: Puzzles[2][0] + "23" })
        .end((err, res) => {
          assert.equal(
            res.body.error,
            "Expected puzzle to be 81 characters long"
          );
          done();
        });
    });
    test("Solve a puzzle that cannot be solved", (done) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({
          puzzle:
            "1.5..2.84..83.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
        })
        .end((err, res) => {
          assert.equal(res.body.error, "Puzzle cannot be solved");
          done();
        });
    });
  });

  suite("POST request to /api/check", () => {
    test("Check a puzzle placement with all fields", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle: Puzzles[2][0], coordinate: "A1", value: 2 })
        .end((err, res) => {
          assert.isTrue(res.body.valid);
          done();
        });
    });
    test("Check a puzzle placement with single placement conflict", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle: Puzzles[2][0], coordinate: "A1", value: "9" })
        .end((err, res) => {
          assert.sameMembers(res.body.conflict, ["row"]);
          done();
        });
    });
    test("Check a puzzle placement with multiple placement conflicts", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle: Puzzles[2][0], coordinate: "A1", value: "4" })
        .end((err, res) => {
          assert.sameMembers(res.body.conflict, ["column", "region"]);
          done();
        });
    });
    test("Check a puzzle placement with all placement conflicts", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle: Puzzles[2][0], coordinate: "A1", value: "7" })
        .end((err, res) => {
          assert.sameMembers(res.body.conflict, ["row", "column", "region"]);
          done();
        });
    });
    test("Check a puzzle placement with missing required fields", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle: "", coordinate: "a2", value: "" })
        .end((err, res) => {
          assert.equal(res.body.error, "Required field(s) missing");
          done();
        });
    });
    test("Check a puzzle placement with invalid characters", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle:
            "..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492..1m",
          coordinate: "a2",
          value: 2,
        })
        .end((err, res) => {
          assert.equal(res.body.error, "Invalid characters in puzzle");
          done();
        });
    });
    test("Check a puzzle placement with incorrect length", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle: "111....111", coordinate: "aA2", value: "11" })
        .end((err, res) => {
          assert.equal(
            res.body.error,
            "Expected puzzle to be 81 characters long"
          );
          done();
        });
    });
    test("Check a puzzle placement with invalid placement coordinate", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle: Puzzles[2][0], coordinate: "J1", value: 2 })
        .end((err, res) => {
          assert.equal(res.body.error, "Invalid coordinate");
          done();
        });
    });
    test("Check a puzzle placement with invalid placement value", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle: Puzzles[2][0], coordinate: "J9", value: 22 })
        .end((err, res) => {
          assert.equal(res.body.error, "Invalid value");
          done();
        });
    });
  });
});
