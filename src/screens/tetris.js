import React, { useState, useEffect, Component } from 'react';
import  '../styles/tetris.css'

function Tetris() {
    var [play, setPlay] = useState(false);
    var [count, setCount] = useState(0);
    var start = false;
    var [piece, setPiece] = useState({});
    var [hold, setHold] = useState({});
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
    perm : [
        [1, 1],
        [1, 1]
    ]
    };
    const S_piece = {
        row: 0,
        col: 3,
        size: 3,
        perm : [
            [0, 0, 0],
            [0, 2, 2],
            [2, 2, 0]
        ]
    };
    const Z_piece = {
        row: 0,
        col: 3,
        size: 3,
        perm : [
            [0, 0, 0],
            [3, 3, 0],
            [0, 3, 3]
        ]
    };
    const T_piece = {
        row: 0,
        col: 3,
        size: 3,
        perm : [
            [0, 0, 0],
            [0, 4, 0],
            [4, 4, 4]
        ]
    };
    const L_piece = {
        row: 0,
        col: 3,
        size: 3,
        perm : [
            [0, 0, 0],
            [0, 0, 5],
            [5, 5, 5]
        ]
    };
    const J_piece = {
        row: 0,
        col: 3,
        size: 3,
        perm : [
            [0, 0, 0],
            [6, 0, 0],
            [6, 6, 6]
        ]
    };
    const I_piece = {
        row: 0,
        col: 3,
        size: 4,
        perm : [
            [0, 0, 0, 0],
            [7, 7, 7, 7],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    };

    function switchHold() {
        let temp = Object.assign({}, piece);
        setPiece(hold);
        setHold(temp);
    }

    function nextPiece() {
        let temp = 1 + Math.trunc(7 * Math.random())
        switch (temp) {
            case 1:
                setPiece(Object.assign({}, O_piece));
                break;
            case 2:
                setPiece(Object.assign({}, S_piece))
                break;
            case 3:
                setPiece(Object.assign({}, Z_piece))
                break;
            case 4:
                setPiece(Object.assign({}, T_piece))
                break;
            case 5:
                setPiece(Object.assign({}, L_piece))
                break;
            case 6:
                setPiece(Object.assign({}, J_piece))
                break;
            default:
                setPiece(Object.assign({}, I_piece))
                break;
        }
        console.log(piece.perm)
    }

    function rotate() {
        let rotated = []
        for (let i = 0; i < piece.size; i++) {
            let temp = []
            for (let j = 0; j < piece.size; j++) {
                temp.push(piece.perm[piece.size - j - 1][i])
            }
            rotated.push(temp)
        }
        setPiece({row : piece.row,
            col : piece.col,
            size : piece.size,
            perm : rotated});
        console.log(piece.perm)
    }
    
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

    // Every second, componentDidUpdate counter
    useEffect(() => {
        const timer = setInterval(counter, 1000);
        return () => clearInterval(timer);
    }, [count, piece]);

    //componentDidMount piece
    useEffect(() => {
        nextPiece();
    }, []);
    
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
                    <p>HI {piece.perm}</p>
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
            <button onClick={rotate}>
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