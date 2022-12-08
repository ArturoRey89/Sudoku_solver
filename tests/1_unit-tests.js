const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
const Puzzles = require("../controllers/puzzle-strings.js").puzzlesAndSolutions;

const solver = new Solver();
let solve = solver.solve.bind(solver);

suite("Unit Tests", () => {
  suite("#Solver.validate()", () => {
    test("handles a valid puzzle string of 81 characters", (done) => {
      assert.isTrue(solver.validate(validPuzzle1).valid);
      done();
    });

    test("handles a puzzle string with invalid characters (not 1-9 or .)", (done) => {
      assert.equal(
        solver.validate(invalidPuzzle1).error,
        "Invalid characters in puzzle",
        "should catch invalid 'g' in input"
      );
      assert.equal(
        solver.validate(invalidPuzzle2).error,
        "Invalid characters in puzzle",
        "should catch invalid '\\' in input"
      );
      assert.equal(
        solver.validate(invalidPuzzle3).error,
        "Invalid characters in puzzle",
        "should catch invalid '?' in input"
      );
      done();
    });

    test("handles a puzzle string that is not 81 characters in length", (done) => {
      assert.equal(
        solver.validate(invalidPuzzle4).error,
        "Expected puzzle to be 81 characters long"
      );
      done();
    });
  });

  suite("#Solver.checkRowPlacement()", () => {
    test("handles a valid row placement", (done) => {
      assert.isTrue(solver.checkRowPlacement(validPuzzle1, 3, 1, 7));
      done();
    });
    test("handles an invalid row placement", (done) => {
      assert.isFalse(solver.checkRowPlacement(validPuzzle1, 2, 1, 7));
      done();
    });
  });

  suite("#Solver.checkColPlacement()", () => {
    test("handles a valid column placement", (done) => {
      assert.isTrue(solver.checkColPlacement(validPuzzle1, 3, 1, 7));
      done();
    });
    test("handles an invalid column placement", (done) => {
      assert.isFalse(solver.checkColPlacement(validPuzzle1, 3, 1, 8));
      done();
    });
  });

  suite("#Solver.checkRegionPlacement()", () => {
    test("handles a valid region (3x3 grid) placement", (done) => {
      assert.isTrue(solver.checkRegionPlacement(validPuzzle1, 3, 1, 7));
      done();
    });
    test("handles an invalid region (3x3 grid) placement", (done) => {
      assert.isFalse(solver.checkRegionPlacement(validPuzzle1, 3, 1, 6));
      done();
    });
  });

  suite("#Solver.solve()", () => {
    test("Valid puzzle strings pass the solver", (done) => {
      solve(validPuzzle1);
      assert.isFalse(solver.error);
      assert.isString(solver.solution);

      solve(validPuzzle2);
      assert.isFalse(solver.error);
      assert.isString(solver.solution);

      solve(validPuzzle3);
      assert.isFalse(solver.error);
      assert.isString(solver.solution);

      solve(validPuzzle4);
      assert.isFalse(solver.error);
      assert.isString(solver.solution);

      solve(validPuzzle5);
      assert.isFalse(solver.error);
      assert.isString(solver.solution);
      done();
    });
    test("Invalid puzzle strings fail the solver", (done) => {
      solve(noSolutionPuzzle);
      assert.isFalse(solver.solution);
      assert.equal(solver.error, "Puzzle cannot be solved");
      done();
    });
    test("returns the expected solution for an incomplete puzzle", (done) => {
      solve(validPuzzle1);
      assert.equal(solver.solution, Puzzles[0][1]);
      solve(validPuzzle2);
      assert.equal(solver.solution, Puzzles[1][1]);
      solve(validPuzzle3);
      assert.equal(solver.solution, Puzzles[2][1]);
      solve(validPuzzle4);
      assert.equal(solver.solution, Puzzles[3][1]);
      solve(validPuzzle5);
      assert.equal(solver.solution, Puzzles[4][1]);
      done();
    });
  });
});

const validPuzzle1 = Puzzles[0][0];
const validPuzzle2 = Puzzles[1][0];
const validPuzzle3 = Puzzles[2][0];
const validPuzzle4 = Puzzles[3][0];
const validPuzzle5 = Puzzles[4][0];

const invalidPuzzle1 =
  "1.5..2.g4..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
const invalidPuzzle2 =
  "1.5..2.\\4..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
const invalidPuzzle3 =
  "1.5..2.?4..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
const invalidPuzzle4 =
  "1.5..2.444..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
const noSolutionPuzzle =
  "1.5..2.84..83.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
