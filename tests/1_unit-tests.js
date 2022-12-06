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
      //"Logic handles a valid puzzle string of 81 characters"
      //"Logic handles a puzzle string with invalid characters (not 1-9 or .)"
      //"Logic handles a puzzle string that is not 81 characters in length"
    });
    suite("Solver.checkRowPlacement()", () => {
      //"Logic handles a valid row placement"
      //"Logic handles an invalid row placement"
    });
    suite("Solver.checkColPlacement()", () => {
      //"Logic handles a valid column placement"
      //"Logic handles an invalid column placement"
    });
    suite("Solver.checkRegionPlacement()", () => {
      //"Logic handles a valid region (3x3 grid) placement"
      //"Logic handles an invalid region (3x3 grid) placement"
    });
    suite("Solver.solve()", () => {
      //"Valid puzzle strings pass the solver"
      //"Invalid puzzle strings fail the solver"
      //"Solver returns the expected solution for an incomplete puzzle"
    })
});
