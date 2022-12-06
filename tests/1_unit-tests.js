const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const solver = new Solver();
const validate = solver.validate;
const checkRow = solver.checkRowPlacement;
const checkCol = solver.checkColPlacement;
const checkReg = solver.checkRegionPlacement;
const solve = solver.solve;

suite("Unit Tests", () => {
    suite("Solver.validate()", () => {
      test("handles a valid puzzle string of 81 characters", (done) => {
        assert.fail()
        done()
      })
      test("handles a puzzle string with invalid characters (not 1-9 or .)", (done) => {
        assert.fail()
        done()
      })
      test("handles a puzzle string that is not 81 characters in length", (done) => {
        assert.fail()
        done()
      })
    });
    suite("Solver.checkRowPlacement()", () => {
      test("handles a valid row placement", (done) => {
        assert.fail()
        done()
      })
      test("handles an invalid row placement", (done) => {
        assert.fail()
        done()
      })
    });
    suite("Solver.checkColPlacement()", () => {
      test("handles a valid column placement", (done) => {
        assert.fail()
        done()
      })
      test("handles an invalid column placement", (done) => {
        assert.fail()
        done()
      })
    });
    suite("Solver.checkRegionPlacement()", () => {
      test("handles a valid region (3x3 grid) placement", (done) => {
        assert.fail()
        done()
      })
      test("handles an invalid region (3x3 grid) placement", (done) => {
        assert.fail()
        done()
      })
    });
    suite("Solver.solve()", () => {
      test("Valid puzzle strings pass the solver", (done) => {
        assert.fail()
        done()
      })
      test("Invalid puzzle strings fail the solver", (done) => {
        assert.fail()
        done()
      })
      test("Solver returns the expected solution for an incomplete puzzle", (done) => {
        assert.fail()
        done()
      })
    })
});

const validPuzzle =
  "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
const invalidPuzzle1 =
  "1.5..2.g4..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
const invalidPuzzle2 =
  "1.5..2.g4..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
const invalidPuzzle3 =
  "1.5..2.?4..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
const invalidPuzzle4 =
  "1.5..2.444..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
const noSolutionPuzzle =
  "1.5..2.84..83.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";