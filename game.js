const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout});

// Start new game
function start() {
  // Setting up the Tic-Tac-Toe board 
  let board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ];
  //the first player
  let Player = 'X';

  // print the Tic-Tac-Toe borad
 function printBoard() {
 
  console.log('  0   1   2');

  for (let i = 0; i < 3; i++) {
    let rowText = board[i][0] + ' | ' + board[i][1] + ' | ' + board[i][2];
    console.log(i + ' ' + rowText);

    if (i < 2) {
      console.log('-------------');
    }
  }
}

  // Judge player victory
  function JudgeWin() {

    for (let i = 0; i < 3; i++) {
      if (board[i][0] === Player && board[i][1] === Player && board[i][2] === Player) return true;
      if (board[0][i] === Player && board[1][i] === Player && board[2][i] === Player) return true;
    }
    if (board[0][0] === Player && board[1][1] === Player && board[2][2] === Player) return true;
    if (board[0][2] === Player && board[1][1] === Player && board[2][0] === Player) return true;
    return false;
  }

  //  Judge player draw
  function JudgeDraw() {
  for (let row of board) {
    for (let cell of row) {
      if (cell === ' ') {
        return false; 
      }
    }
  }
  return true; 
}



function askMove() {
    //First print board
      printBoard(); 

  rl.question(`Player ${Player}, Please enter row and column (0-2) eg."1,1":`, function(answer) {
    // Checking user input
    const parts = answer.split(',');
    const row = parseInt(parts[0]?.trim(), 10);
    const col = parseInt(parts[1]?.trim(), 10);
    //Check if the player input is correct and remind the player if it is incorrect.
    if (parts.length !== 2 || isNaN(row) || isNaN(col)) {
      console.log('Wrong format, please enter two numbers separated by commas!');
      return askMove();
    }
    
    if (row < 0 || row > 2 || col < 0 || col > 2) {
      console.log('The numbers must be 0, 1, 2!');
      return askMove();
    }
   
    if (board[row][col] !== ' ') {
      console.log('This position is occupied, please select again!');
      return askMove();
    }
    
    board[row][col] = Player;

    //Judge winner
    if (JudgeWin()) {
      printBoard();
      console.log(`Player ${Player} win!!!`);
      return askReplay();//Ask if you want to replay the game
    }

    // //judge draw.
    if (JudgeDraw()) {
      printBoard();
      console.log('Sorry, draw.');
      return askReplay();//Ask if you want to replay the game
    }

    // Player swap game
    Player = (Player === 'X') ? 'O' : 'X';
    askMove();
  });
}


  // Ask to replay the game
  function askReplay() {
    rl.question('Do you want to replay game?(y/n):', answer => {
      if (answer.trim().toLowerCase() === 'y') {
        start();  // replay
      } else {
        console.log('Game over, see you!');
        rl.close();
      }
    });
  }

  
  askMove();
}


start();


