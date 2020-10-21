import React, { useState, useEffect } from 'react';
import  '../styles/tetris.css'



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
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        ]
        
    //     { 
    //     row0 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Row 0
    //     row1 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Row 1
    //     row2 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Row 2
    //     row3 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Row 3
    //     row4 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Row 4
    //     row5 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Row 5
    //     row6 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Row 6
    //     row7 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Row 7
    //     row8 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Row 8
    //     row9 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Row 9
    //     row10 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Row 10
    //     row11 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Row 11
    //     row12 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Row 12
    //     row13 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Row 13
    //     row14 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Row 14
    //     row15 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Row 15
    //     row16 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Row 16
    //     row17 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Row 17
    //     row18 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Row 18
    //     row19 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Row 19
    // }
    )
    
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