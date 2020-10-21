import React, { useState, useEffect } from 'react';
import  '../styles/tetris.css'

/*
Row/Col are the top left coordinate of the "coords"
Size is the side length of the coords's "square"
The positive integer inside the coords represent color

Tetris Pieces start hidden above the grid and fall down.
- Grid display is 10 x 20
- 3 hidden rows above grid 
*/

const O_piece = {
    row: 1,
    col: 4,
    size: 2,
    coords : [
        [1, 1],
        [1, 1]
    ]
};
const S_piece = {
    row: 0,
    col: 3,
    size: 3,
    coords : [
        [0, 0, 0],
        [0, 2, 2],
        [2, 2, 0]
    ]
};
const Z_piece = {
    row: 0,
    col: 3,
    size: 3,
    coords : [
        [0, 0, 0],
        [3, 3, 0],
        [0, 3, 3]
    ]
};
const T_piece = {
    row: 0,
    col: 3,
    size: 3,
    coords : [
        [0, 0, 0],
        [0, 4, 0],
        [4, 4, 4]
    ]
};
const L_piece = {
    row: 0,
    col: 3,
    size: 3,
    coords : [
        [0, 0, 0],
        [0, 0, 5],
        [5, 5, 5]
    ]
};
const J_piece = {
    row: 0,
    col: 3,
    size: 3,
    coords : [
        [0, 0, 0],
        [6, 0, 0],
        [6, 6, 6]
    ]
};
const I_piece = {
    row: 0,
    col: 3,
    size: 4,
    coords : [
        [0, 0, 0, 0],
        [7, 7, 7, 7],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
};


function Tetris() {
    var [play, setPlay] = useState(false);
    var [count, setCount] = useState(0)
    var [piece, setPiece] = useState(null)
    var [hold, setHold] = useState(null)
    var [grid, setGrid] = useState(
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Row 0
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Row 5
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Row 10
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Row 15
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Row 20
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]);
    
    function alert_play() {
        alert(play)
    };

    function toggle_play() {
        setPlay(!play)
    };

    function counter() {
        if (count % 5 === 0) {
            move_piece();
        } else {
        console.log(count)}
        setCount(count + 1)
    }
    
    function move_piece() {
        if (play === true) {
            console.log(count, play)
        } else {
            console.log(count, "play is not true")
        }
    };

    useEffect(() => {
        const timer = setInterval(counter, 1000);
        return () => clearInterval(timer);
    });

    
    
    return (
        <React.Fragment>
          <div>
            <table className="tetris-page">
            <tr>
                <td className="">
                Instructions Page:
                </td>
                <td className="">
                Tetris
                </td>
                <td className="">
                Next Pieces
                </td>
            </tr>
            <tr>
                <td className="instructions-page">
                    <p>Count: {count}</p>
                    <p>{play ? "Playing" : "Paused"}</p>
                </td>
                <td className="tetris-screen">
                <table className="tetris-screen-display">
                    {grid.slice(3,23).map((row) =>
                        <tr className="tetris-row">
                            {row.map((col) =>
                                <td>{col}</td>
                            )}
                        </tr>
                    )}
                    <tr>
                        <td className={"{grid[0][0]}"}></td>
                    </tr>
                </table>
                </td>
                <td className="next-pieces">
                table-stuff
                </td>
            </tr>
            </table>
            <button onClick={alert_play}>
                Click me!
            </button>
            <button onClick={toggle_play}>
                Toggle Play
            </button>
            {/* <button onClick={start_game}>
                Start Game
            </button> */}
        </div>
      </React.Fragment>)
    
};

export default Tetris;