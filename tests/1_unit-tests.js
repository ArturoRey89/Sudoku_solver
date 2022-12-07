const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const Puzzles = require("../controllers/puzzle-strings.js").puzzlesAndSolutions;

const solver = new Solver();
let validate = solver.validate;
let checkRow = solver.checkRowPlacement;
let checkCol = solver.checkColPlacement;
let checkReg = solver.checkRegionPlacement;

suite("Unit Tests", () => {
    suite("#Solver.validate()", () => {
      test("handles a valid puzzle string of 81 characters", (done) => {
        assert.isTrue(validate(validPuzzle1));
        done();
      })

      test("handles a puzzle string with invalid characters (not 1-9 or .)", (done) => {
        assert.equal(
          validate(invalidPuzzle1).error,
          "Invalid characters in puzzle",
          "should catch invalid 'g' in input"
        );
        assert.equal(
          validate(invalidPuzzle2).error,
          "Invalid characters in puzzle",
          "should catch invalid '\\' in input"
        );
        assert.equal(
          validate(invalidPuzzle3).error,
          "Invalid characters in puzzle",
          "should catch invalid '?' in input"
        );
        done();
      })

      test("handles a puzzle string that is not 81 characters in length", (done) => {
        assert.equal(
          validate(invalidPuzzle4).error,
          "Expected puzzle to be 81 characters long"
        );
        done();
      })
    });


    suite("#Solver.checkRowPlacement()", () => {
      test("handles a valid row placement", (done) => {
        assert.isTrue(checkRow(validPuzzle1, 3, 1, 7));
        done();
      })
      test("handles an invalid row placement", (done) => {
        assert.isFalse(checkRow(validPuzzle1, 2, 1, 7));
        done();
      })
    });


    suite("#Solver.checkColPlacement()", () => {
      test("handles a valid column placement", (done) => {
        assert.isTrue(checkCol(validPuzzle1, 3, 1, 7));
        done();
      })
      test("handles an invalid column placement", (done) => {
        assert.isFalse(checkCol(validPuzzle1, 3, 1, 8));
        done();
      })
    });


    suite("#Solver.checkRegionPlacement()", () => {
      test("handles a valid region (3x3 grid) placement", (done) => {
        assert.isTrue(checkReg(validPuzzle1, 3, 1, 7));
        done();
      })
      test("handles an invalid region (3x3 grid) placement", (done) => {
        assert.isFalse(checkReg(validPuzzle1, 3, 1, 6));
        done();
      })
    });


    suite("#Solver.solve()", () => {
      test("Valid puzzle strings pass the solver", (done) => {
        assert.isFalse(solver.solve(validPuzzle1).error);
        assert.isFalse(solver.solve(validPuzzle2).error);
        assert.isFalse(solver.solve(validPuzzle3).error);
        assert.isFalse(solver.solve(validPuzzle4).error);
        assert.isFalse(solver.solve(validPuzzle5).error);
        assert.isString(solver.solve(validPuzzle1).solution);
        assert.isString(solver.solve(validPuzzle2).solution);
        assert.isString(solver.solve(validPuzzle3).solution);
        assert.isString(solver.solve(validPuzzle4).solution);
        assert.isString(solver.solve(validPuzzle5).solution);
        done();
      })
      test("Invalid puzzle strings fail the solver", (done) => {
        assert.equal(
          new solver.solve(noSolutionPuzzle).error,
          "Puzzle cannot be solved"
        );
        done();
      })
      test("returns the expected solution for an incomplete puzzle", (done) => {
        assert.equal(solver.solve(validPuzzle1).solution, Puzzles[0][1]);
        assert.equal(solver.solve(validPuzzle2).solution, Puzzles[1][1]);
        assert.equal(solver.solve(validPuzzle3).solution, Puzzles[2][1]);
        assert.equal(solver.solve(validPuzzle4).solution, Puzzles[3][1]);
        assert.equal(solver.solve(validPuzzle5).solution, Puzzles[4][1]);
        done();
      })
    })
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