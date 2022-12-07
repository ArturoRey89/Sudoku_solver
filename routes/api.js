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
      res.send("");
    });
};
