const gameboardModule = (() => {
  // Creating empty array for gameboard
  let gameboard = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = 'X';
  let gameActive = true;

  // Places mark (X/O) at a certain index spot
  function placeMark(index) {
    if (gameActive === true) {
      if (gameboard[index] === "") {
        gameboard[index] += currentPlayer;
        renderModule.renderGameboard(gameboard)
        getGameboard()
        switchPlayer()
        checkWin();
      }
      else {
        console.log("Choose an empty cell 😡");
      }
      // renderModule.renderGameboard(gameboard);
    }
    else {
      console.log("Game is already over 😡")
    }
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
    if (gameActive) {
      checkTie();
    }
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

  function resetGame() {
    gameboard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = 'X';
    renderModule.renderGameboard(gameboard)
  }

  function getGameboard() {
    console.log(gameboard);

  }

  return {
    placeMark: placeMark,
    resetGame: resetGame,
    getGameboard: getGameboard,
    gameboard: gameboard,
  };
})()

// Sets up event listeners
const renderModule = (() => {
  const gameCell = document.querySelectorAll('.game-cell');

  function renderGameboard(gameboard) {
    gameCell.forEach((cell, index) => {
      cell.textContent = gameboard[index]
    })
  }

  function setEventListeners() {

    gameCell.forEach((cell, index) => {
      cell.addEventListener('click', () => {
        gameboardModule.placeMark(index);
      });
    });
  }
  return {
    setEventListeners: setEventListeners,
    renderGameboard: renderGameboard,
  };
})()

renderModule.setEventListeners()

const resetButton = document.querySelector('.reset-button');

resetButton.addEventListener('click', () => {
  gameboardModule.resetGame();
  gameboardModule.getGameboard();
});
