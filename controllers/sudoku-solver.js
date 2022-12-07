class SudokuSolver {

  validate(puzzleString) {
    if( puzzleString.length != 81 ) {
      return { error: "Expected puzzle to be 81 characters long" };
    }
    const regex = /^[\d|\.]+$/
    if ( !regex.test(puzzleString) ) {
      return { error: "Invalid characters in puzzle" };
    }
    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let rowValues = puzzleString.slice(9 * (row - 1), 9 * row);
    if (rowValues.indexOf(value) == -1 || rowValues.indexOf(value) == (column - 1)) {
      return true;
    } else {
      return false;
    }
  }

  checkColPlacement(puzzleString, row, column, value) {
    let columnValues = "";
    for(let i=0; i<9; i++){
      columnValues += puzzleString.charAt(i*9 + column -1)
    }
    if (columnValues.indexOf(value) == -1 || columnValues.indexOf(value) == (row - 1)) {
      return true;
    } else {
      return false;
    }
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let regionValues = "";
    let regionUpperLeftCorner =
      27 * Math.floor((row - 1) / 3) + Math.floor((column - 1) / 3) * 3;
    for (
      let i = regionUpperLeftCorner;
      i <= regionUpperLeftCorner + 18;
      i += 9
    ) {
      regionValues += puzzleString.slice(i, 3 + i);
    }
    let valueRegionPosition = 3*(row - 1)%3 + (column -1)%3;
    if (
      regionValues.indexOf(value) == -1 ||
      regionValues.indexOf(value) == valueRegionPosition
    ) {
      return true;
    } else {
      return false;
    }
  }

  solve(puzzleString) { 
    let column;
    let row;
    let puzzleArray;
    for (let index = 0; index < 81; index++) {
      column = (index % 9) + 1;
      row = Math.ceil((index + 1) / 9)
      if (puzzleString[index] === ".") {
        let possibleSolutions = [];
        for (let value = 1; value <= 9; value++) {
          if (
            this.checkRowPlacement(puzzleString, row, column, value) &&
            this.checkColPlacement(puzzleString, row, column, value) &&
            this.checkRegionPlacement(puzzleString, row, column, value)
          ) {
            console.log(value, [row,column])
            possibleSolutions.push(value);
          }
        }
        if (possibleSolutions.length === 1) {
          puzzleArray = puzzleString.split("");
          puzzleArray[index] = possibleSolutions;[0]
          puzzleString = puzzleArray.join("");
        }
      }
    }
    console.log(puzzleString);
    //col = index%9 + 1
    //row = Math.ceil((index+1)/9)
  }
}

module.exports = SudokuSolver;
