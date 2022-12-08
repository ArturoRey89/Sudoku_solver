'use strict';

const { send } = require('process');
const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      res.send("")
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let puzzle = req.body.puzzle;
      let validInput = solver.validate(puzzle);
      console.log(validInput);
      if (validInput.valid) {
        solve(puzzle);
        if (solver.solution) {
          res.json({ solution: solver.solution });
        } else {
          res.json({ error: solver.error });
        }
      } else if (validInput.error) {
        res.send({ error: validInput.error });
      } else {
        res.json({ error: "unknown error" });
      }
    });
};
