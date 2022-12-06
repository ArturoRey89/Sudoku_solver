const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();
let validate = solver.validate; 
let checkRow = solver.checkRowPlacement;
let checkCol = solver.checkColPlacement;
let checkReg = solver.checkRegionPlacement;
let solve = solver.solve;

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
