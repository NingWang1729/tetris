import React, { useState, useEffect, cloneElement } from 'react';
import  '../styles/tetris.css'

function Tetris() {
    var [play, setPlay] = useState(false);  // Whether game is playing or paused
    var [count, setCount] = useState(0);    // Timer, 1 second per count
    var [piece, setPiece] = useState({});   // Current piece being played
    var [hold, setHold] = useState({});     // Current piece being held
    var [grid, setGrid] = useState(         // 10 x 23 grid, 3 top rows are hidden
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
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 7],
            [5, 0, 0, 0, 0, 0, 6, 6, 6, 7], //Row 20
            [5, 3, 3, 0, 0, 2, 2, 4, 6, 7],
            [5, 5, 3, 3, 2, 2, 4, 4, 4, 7]
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
        color : "yellow",
        row : 1,
        col : 4,
        size : 2,
        perm : [
            [1, 1],
            [1, 1]
        ]
    };
    const S_piece = {
        color : "green",
        row : 0,
        col : 3,
        size : 3,
        perm : [
            [0, 0, 0],
            [0, 2, 2],
            [2, 2, 0]
        ]
    };
    const Z_piece = {
        color : "red",
        row : 0,
        col : 3,
        size : 3,
        perm : [
            [0, 0, 0],
            [3, 3, 0],
            [0, 3, 3]
        ]
    };
    const T_piece = {
        color : "purple",
        row : 0,
        col : 3,
        size : 3,
        perm : [
            [0, 0, 0],
            [0, 4, 0],
            [4, 4, 4]
        ]
    };
    const L_piece = {
        color : "orange",
        row : 0,
        col : 3,
        size : 3,
        perm : [
            [0, 0, 0],
            [0, 0, 5],
            [5, 5, 5]
        ]
    };
    const J_piece = {
        color : "blue",
        row : 0,
        col : 3,
        size : 3,
        perm : [
            [0, 0, 0],
            [6, 0, 0],
            [6, 6, 6]
        ]
    };
    const I_piece = {
        color : "cyan",
        row : 0,
        col : 3,
        size : 4,
        perm : [
            [0, 0, 0, 0],
            [7, 7, 7, 7],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    };

    // Switches the piece being played with the piece being held
    // TODO: Start piece back at the top
    // TODO: Ensure one one switch is possible per placement
    function switchHold() {
        let temp = Object.assign({}, piece);
        setPiece(hold);
        setHold(temp);
    }

    // Randomly Generates the next piece to play
    // Runs once at very start
    // TODO: Have a display of upcoming pieces
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

    // Rotates the current piece held
    // TODO: Ensure the rotation does not cause collision
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
    };

    // Pauses and unpauses game
    function toggle_play() {
        setPlay(!play)
    };

    // Counts each second and moves piece per 5 seconds
    function counter() {
        if (count % 5 === 0 && play) {
            move_piece();
            updateColors();
        } else {
        console.log(count)}
        setCount(count + 1)
    };
    
    // Moves piece
    // TODO: Move piece and check for collision
    function move_piece() {
        if (play === true) {
            console.log(count, play);
        } else {
            console.log(count, "play is not true");
        }
    };
    function updateColors() {
        console.log("Updating colors")
        let tetris_grid = document.getElementsByClassName("tetris-screen-display").item(0).childNodes;
        for (let i = 0; i < tetris_grid.length; i++) {
            // Checks each row, from row 0 to 19
            let row = tetris_grid.item(i).childNodes;
            // console.log(i, row)
            for (let j = 0; j < row.length; j++) {
                let col = row.item(j)
                switch (grid[i + 3][j]) {
                    case 0:
                        col.id = "gray";
                        break;
                    case 1:
                        col.id = "yellow";
                        break;
                    case 2:
                        col.id = "green";
                        break;
                    case 3:
                        col.id = "red";
                        break;
                    case 4:
                        col.id = "purple";
                        break;
                    case 5:
                        col.id = "orange";
                        break;
                    case 6:
                        col.id = "blue";
                        break;
                    case 7:
                        col.id = "cyan";
                        break;
                    default:
                        col.id = "gray"
                }
            }
        }
    };

    // Every second, componentDidUpdate counter, piece
    useEffect(() => {
        const timer = setInterval(counter, 1000);
        return () => clearInterval(timer);
    }, [count]);

    //componentDidMount piece, starts off with a random piece
    useEffect(() => {
        nextPiece();
    }, []);
    
    // Returns the html component
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
                        {grid.slice(3,23).map((row, row_index) =>
                            <tr className="tetris-row">
                                {row.map((col, col_index) =>
                                    <td  id={`${col}`} className={`${row_index + 3}-${col_index}`}>{col}</td>
                                )}
                            </tr>
                        )}
                        {/* <tr>
                            <td className={"{grid[0][0]}"}></td>
                        </tr> */}
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