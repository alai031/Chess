import './App.css'
import {useState} from 'react';
import {Chessboard} from 'react-chessboard';
import {Chess} from 'chess.js';

function App() {

  const [game, setGame] = useState(new Chess());

  const makeMove = (move) => {
    game.move(move);
    setGame(new Chess(game.fen()))
  }

  //Movement of computer
  function makeRandomMove(){
    const possibleMoves = game.moves();

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
    if (move === null)
      return false;

    //valid move
    setTimeout(makeRandomMove, 200);
    return true;
  }

  return (
    <div className="app">
       <Chessboard
        position = {game.fen()}
        onPieceDrop = {onDrop}
       />
    </div>
  );
}

export default App;
