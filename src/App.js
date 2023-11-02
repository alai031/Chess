import './App.css'
import React, {useState} from 'react';
import {Chessboard} from 'react-chessboard';
import {Chess} from 'chess.js';

function App() {

  const [option, setOption] = useState(0); //1 is play vs computer, 2 is play vs player
  const [winner, setWinner] = useState(0); //1 means player1 is the winner, 2 means the computer is, 3 means player 2 is the winner
  const [game, setGame] = useState(new Chess());

  const makeMove = (move) => {
    const possibleMoves = game.moves();
    console.log("Player possible moves: ", possibleMoves);

    try{
      game.move(move);
      if (game.isCheckmate()){
        console.log("checkmate");
        if (game.turn() === 'b')
          setWinner(1); //Player 1 is the winner
        else{
          if (option === 1) //Player vs computer => Computer is the winner
            setWinner(2);
          else  //Player vs player => Player2 is the winner
            setWinner(3); 
        }  
      }
    }
    catch (error) { //not a valid move made
      return "invalid move";
    }

    setGame(new Chess(game.fen()));
  }

  //Movement of computer
  function makeRandomMove(){
    const possibleMoves = game.moves();
    console.log("Computer possible moves: ", possibleMoves);

    //exit if the game is over

    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0)
      return;

    //select random move

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);

    makeMove(possibleMoves[randomIndex]);
  }

  //Perform an action when a piece is dropped by a user

  function onDrop(source, target){
    const move = makeMove({
      from: source,
      to: target,
      promotion: "q", //always promote to a queen for example simplicity
    });

    // illegal move
    if (move === "invalid move"){
      console.log("Not a valid move. Please try again.") //TODO: Display on game screen
      return false;
    }

    //valid move
    //makeRandomMove();
    if (option === 1){
      setTimeout(makeRandomMove, 200);
    }

    return true;
  }

  const playComputer = () => {
    console.log("Play against computer");
    setOption(1);
  }

  const playPlayer = () => {
    console.log("Play against player");
    setOption(2);
  }

  const menu = () => {
    console.log("Display menu");
    setOption(0);
    setWinner(0);
    setGame(new Chess());
  }

  const playAgain = () => {
    console.log("Play again");
    setWinner(0);
    setGame(new Chess());
  }

  return (
    <div className="app">
      <div className="container">

        <div className="top">
          CHESS
          {winner === 1 && 
            <div id="player1Winner">
              Player 1 wins!
            </div>
          }
          {winner === 2 && 
            <div id="computerWinner">
              Computer wins!
            </div>
          }
          {winner === 3 && 
            <div id="player2Winner">
              Player 2 wins!
            </div>
          }
        </div>

        <div className="mid">

          {option === 0 &&
            <div id="options">
              <button className="b1" onClick={playComputer}>PLAY AGAINST COMPUTER</button>
              <button className="b2" onClick={playPlayer}>PLAY AGAINST PLAYER</button>
            </div>
          }
          {option !== 0 && 
            <Chessboard
            position = {game.fen()}
            onPieceDrop = {onDrop}
            />
          }

        </div>

        <div className="bottom">
          {winner !== 0 && 
            <button className="b4" onClick={playAgain}>Play again</button>
          }
          {option !== 0 && 
            <button className="b3" onClick={menu}>Back to menu</button>
          }
          BOTTOM
        </div>
       
      </div>
    </div>
  );
}

export default App;
