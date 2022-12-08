"use strict";

const { send } = require("process");
const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();
  let solve = solver.solve.bind(solver);

  app.route("/api/check").post((req, res) => {
    const regexCoordinate = /^[A-Ia-i][1-9]$/;
    const regexValue = /^[1-9]$/;
    let { puzzle, coordinate, value } = req.body;
    let result = { valid: true };
    let conflict = [];
    let validatePuzzle = solver.validate(puzzle);

    //catch invalid input
    if (!puzzle || !coordinate || !value) {
      res.json({ error: "Required field(s) missing" });
      return;
    }
    if (!validatePuzzle.valid) {
      res.json({ error: validatePuzzle.error });
      return;
    }
    if (!regexValue.test(value)) {
      res.json({ error: "Invalid value" });
      return;
    }
    if (!regexCoordinate.test(coordinate)) {
      res.json({ error: "Invalid coordinate" });
      return;
    }

    let row = (coordinate.charCodeAt(0) - 32) % 32;
    let column = coordinate[1] * 1;

    if (!solver.checkRowPlacement(puzzle, row, column, value)) {
      result.valid = false;
      conflict.push("row");
    }
    if (!solver.checkColPlacement(puzzle, row, column, value)) {
      result.valid = false;
      conflict.push("column");
    }
    if (!solver.checkRegionPlacement(puzzle, row, column, value)) {
      result.valid = false;
      conflict.push("region");
    }

    if (conflict.length > 0) {
      result.conflict = conflict;
    }

    res.json(result);
  });

  app.route("/api/solve").post((req, res) => {
    let puzzle = req.body.puzzle;
    let validInput = solver.validate(puzzle);
    if (puzzle === "") {
      res.json({ error: "Required field missing" });
      return;
    }
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
