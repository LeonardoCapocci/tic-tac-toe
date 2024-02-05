const gameboardModule = (() => {
  // Creating empty array for gameboard
  const gameboard = ["", "", "", "", "", "", "", "", ""];

  // Places mark (X/O) at a certain index spot
  function placeMark(index, markType) {
    if (gameboard[index] === "") {
      gameboard[index] += markType;
      console.log(gameboard);
      checkWin();
      }
    else console.log("Choose an empty cell 😡")
    };

  // Checking if the game is over on placement of mark
  function checkWin() {
    const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
    [0, 4, 8], [2, 4, 6]             // diagonals   
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      // X wins
      if (gameboard[a] === 'X' && gameboard[b] === 'X' && gameboard[c] === 'X') {
        console.log("Over");
      }
      // O Wins
      if (gameboard[a] === 'O' && gameboard[b] === 'O' && gameboard[c] === 'O') {
        console.log("Over");
      }
    }
    checkTie();
  }

  // Checking if there is a tie
  function checkTie() {
    let isTie = true;
    for (cell in gameboard) {
      if (gameboard[cell] === "") {
        isTie = false;
        break;
      }
    }
    if (isTie) {
      console.log("TIE");
    }
  }

  // placeMark(0,'X');
  // placeMark(1,'X');
  // placeMark(2,'O');
  // placeMark(3,'X');
  // placeMark(4,'X');
  // placeMark(5,'O');
  // placeMark(6,'P');
  // placeMark(7,'J');
  // placeMark(8,'T');
  return {
    placeMark: placeMark
  };
})()