import React from 'react';
import Square from './Square';
import './Board.css';

const Board = ({squares, handleClick}) => {
  

  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={()=> handleClick(i)}/>
  }


   
    return (
      <>
      <div className='board-wrapper'>
        <div className='board-row'>
          {renderSquare(0)} {/* this는 이 클래스를 지정함 */}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className='board-row'>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className='board-row'>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </>
    )
}
export default Board