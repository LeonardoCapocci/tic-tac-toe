const gameboardModule = (() => {
  // Creating empty array for gameboard
  const gameboard = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = 'X';
  let gameActive = true;

  // Places mark (X/O) at a certain index spot
  function placeMark(index) {
    if (gameActive) {
      if (gameboard[index] === "") {
        gameboard[index] += currentPlayer;
        switchPlayer()
        console.log(gameboard);
        checkWin();
      }
      else console.log("Choose an empty cell 😡");
      renderModule.renderGameboard(gameboard);
    }
    else console.log("You already lost 👎")
  }
  
  // Switches current player
  function switchPlayer() {
    if (currentPlayer === 'X') currentPlayer = 'O';
    else currentPlayer = 'X';
  }

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
        console.log("X WINS!");
        gameActive = false;
      }
      // O Wins
      if (gameboard[a] === 'O' && gameboard[b] === 'O' && gameboard[c] === 'O') {
        console.log("O WINS");
        gameActive = false;
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
      gameActive = false;
    }
  }

  return {
    placeMark: placeMark,
    gameboard: gameboard
  };
})()

const renderModule = (() => {
  const gameDisplay = document.querySelector(".game-display");

  function renderGameboard(gameboard) {
    gameDisplay.innerHTML = "";
    gameboardModule.gameboard.forEach((cell, index) => {
      const gameCell = document.createElement('button');
      gameCell.className = "game-cell";
      gameCell.textContent = cell;
      gameDisplay.appendChild(gameCell);
    });
  }
  return {
    renderGameboard: renderGameboard
  };
})()

renderModule.renderGameboard()

gameboardModule.placeMark(0)
gameboardModule.placeMark(1)
gameboardModule.placeMark(8)
gameboardModule.placeMark(4)
gameboardModule.placeMark(7)
gameboardModule.placeMark(2)
gameboardModule.placeMark(6)
gameboardModule.placeMark(5)
gameboardModule.placeMark(3)