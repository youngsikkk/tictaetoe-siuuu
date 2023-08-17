import {useState} from 'react';
import "./App.css"
import Board from "./components/Board";
function App() {

  const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const calculateWinner = (squares) => {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a,b,c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
  }
    return null;
}
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  let status;
  if (winner) {
    status = 'winner: ' + winner;
  } else {
     status = `Next player: ${xIsNext ?  'X' : 'O'}`;
  }
  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber+1);
    const newCurrent = newHistory[newHistory.length - 1];
    const newSquares = newCurrent.squares.slice(); //얕은 복사본을 만듦 
    // 하지만 1차원 배열에 한하여는 깊은 복사본임
    // 2차원 이상부터는 얕은 복사본
    if (calculateWinner(newSquares)||newSquares[i]) return;
    newSquares[i] = xIsNext ? 'X' : "O";
    setHistory([...newHistory, {squares: newSquares}]);
    setXIsNext(!xIsNext);
    // setYIsNext(prev => !prev); 이렇게 해도 됨! 이 방법은 중복이 안씹힘
    setStepNumber(newHistory.length);
  }
  const moves = history.map((step, index) => {
    const desc = index ?
    'Go to move #' + index :
    'Go to game start';
    return (
      <li key={index}>
        <button className='move-button' onClick={()=>{jumpTo(index)}}>{desc}</button>
      </li>
    )
  })
  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext((step%2)===0);
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board squares = {current.squares} handleClick={(i) => {handleClick(i)}} />
      </div>
      <div className="game-info">
        <div className='status'>{status}</div>
        <ol style={{listStyle: "none"}}>{moves}</ol>
        {/* <p style={{fontSize: 100, fontWeight:700}}>Hello World!!!</p> */}
      </div>
    </div>
  );
};

export default App;