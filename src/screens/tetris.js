import React, { useState, useEffect, cloneElement } from 'react';
import  '../styles/tetris.css';

function Tetris() {
    var [play, setPlay] = useState(false);  // Whether game is playing or paused
    var [count, setCount] = useState(0);    // Timer, 1 second per count
    var [piece, setPiece] = useState({});   // Current piece being played
    var [hold, setHold] = useState({});     // Current piece being held
    var [grid, setGrid] = useState(         // 10 x 23 grid, 3 top rows are hidden
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Row 0 through Row 2 hide pieces before play
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
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8], //Row 25 Serves To Act As Lower Bound
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
        ]);

    /*
    Row/Col are the top left coordinate of the "coords"
    Size is the side length of the coords's "square"
    The positive integer inside the coords represent color

    Tetris Pieces start hidden above the grid and fall down
    - Grid display is 10 x 20
    - 3 hidden rows above grid
    */
    const O_piece = {
        color : "yellow",
        row : 0,
        col : 3,
        size : 3,
        perm : [
            [0, 0, 0],
            [0, 1, 1],
            [0, 1, 1]
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
    };

    // Randomly Generates the next piece to play
    // Runs once at very start
    // TODO: Have a display of upcoming pieces
    function nextPiece() {
        let temp = 1 + Math.trunc(7 * Math.random());
        switch (temp) {
            case 1:
                setPiece(Object.assign(O_piece));
                break;
            case 2:
                setPiece(Object.assign(S_piece));
                break;
            case 3:
                setPiece(Object.assign(Z_piece));
                break;
            case 4:
                setPiece(Object.assign(T_piece));
                break;
            case 5:
                setPiece(Object.assign(L_piece));
                break;
            case 6:
                setPiece(Object.assign(J_piece));
                break;
            default:
                setPiece(Object.assign(I_piece));
                break;
        };
    };

    // Rotates the current piece held
    // TODO: Ensure the rotation does not cause collision
    function rotate() {
        // O piece cannot rotate
        if (piece.perm[1][1] === 1 || false) {
            return(false);
        };

        var hit_bottom = false;
        for (let c = 0; c < piece.size; c++) {
            for (let r = piece.size - 1; r > -1; r--){
                if (piece.perm[r][c] > 0) {
                    if (grid[piece.row + r + 1][piece.col + c] !== 0) {
                        hit_bottom = true;
                    };
                    break;
                };
            };
        };
        if (hit_bottom) {
            nextPiece();
            return(false);
        };
        
        //Deletes old piece
        var cleaned_grid = grid;
        for (let i = 0; i < piece.size; i++) {
            for (let j = 0; j < piece.size; j++) {
                if (piece.perm[i][j] !== 0) {
                    cleaned_grid[piece.row + i][piece.col + j] = 0;
                };
            };
        };
        console.log("cleaned grid is",cleaned_grid);

        //Rotates old piece
        let rotated = [];
        for (let i = 0; i < piece.size; i++) {
            let temp = [];
            for (let j = 0; j < piece.size; j++) {
                temp.push(piece.perm[piece.size - j - 1][i]);
            };
            rotated.push(temp);
        };
        
        var can_rotate = true;
        if (piece.col < 0) {
            can_rotate = false;
        } else if (piece.col + piece.size > 10) {
            can_rotate = false;
        } else {
            for (let i = 0; i < piece.size; i++) {
                for (let j = 0; j < piece.size; j++) {
                    if (rotated[i][j] !== 0 && cleaned_grid[piece.row + i][piece.col + j] !== 0) {
                        can_rotate = false;
                    };
                };
            };
        };
        
        if (can_rotate) {
            setGrid(cleaned_grid);
            setPiece({row : piece.row,
                col : piece.col,
                size : piece.size,
                perm : rotated});
            console.log("CAN ROTATE");
        } else {
            setGrid(grid);
            setPiece({row : piece.row,
                col : piece.col,
                size : piece.size,
                perm : piece.perm});
            console.log("CAN NOT ROTATE");
        };
        updateColors();
    };

    // Pauses and unpauses game
    function toggle_play() {
        setPlay(!play);
    };

    // Moves piece downwards by one
    function move_down() {
        // Checks if there is a block in the way
        var hit_bottom = false;
        for (let c = 0; c < piece.size; c++) {
            for (let r = piece.size - 1; r > -1; r--){
                if (piece.perm[r][c] > 0) {
                    if (grid[piece.row + r + 1][piece.col + c] !== 0) {
                        hit_bottom = true;
                    };
                    break;
                };
            };
        };
        if (hit_bottom) {
            nextPiece();
            return(false);
        }
        // Moves piece downwards on grid
        var next_grid = grid;
        for (let i = piece.row; i < piece.row + piece.size; i++) {
            for (let j = piece.col; j < piece.col + piece.size; j++) {
                if (next_grid[i][j] !== 0 && piece.perm[i - piece.row][j - piece.col] !== 0) {
                    next_grid[i][j] = 0;
                };
            };
        };
        for (let i = piece.row + 1; i < piece.row + piece.size + 1; i++) {
            for (let j = piece.col; j < piece.col + piece.size; j++) {
                if (next_grid[i][j] === 0) {
                    next_grid[i][j] = piece.perm[i - piece.row - 1][j - piece.col];
                };
            };
        };
        setPiece({
            color : piece.color,
            row : piece.row + 1,
            col : piece.col,
            size : piece.size,
            perm : piece.perm
        });
        setGrid(next_grid);
    };

    // Moves piece rightwards by one
    function move_right() {
        // Checks if there is a block in the way
        var hit_right = false;
        for (let r = 0; r < piece.size; r++) {
            for (let c = piece.size - 1; c > -1; c--){
                if (piece.perm[r][c] > 0) {
                    if (piece.col + c === 9 || grid[piece.row + r][piece.col + c + 1] !== 0) {
                        hit_right = true;
                    };
                    break;
                };
            };
        };
        if (hit_right) {
            return(false);
        };

        // Moves piece rightwards on grid
        var right_grid = grid;
        for (let i = piece.row; i < piece.row + piece.size; i++) {
            for (let j = piece.col; j < piece.col + piece.size; j++) {
                if (right_grid[i][j] !== 0 && piece.perm[i - piece.row][j - piece.col] !== 0) {
                    right_grid[i][j] = 0;
                };
            };
        };
        for (let i = piece.row; i < piece.row + piece.size; i++) {
            for (let j = piece.col + 1; j < piece.col + piece.size + 1; j++) {
                if (right_grid[i][j] === 0) {
                    right_grid[i][j] = piece.perm[i - piece.row][j - piece.col - 1];
                };
            };
        };
        setPiece({
            color : piece.color,
            row : piece.row,
            col : piece.col + 1,
            size : piece.size,
            perm : piece.perm
        });
        setGrid(right_grid);
    };

    // Moves piece leftwards by one
    function move_left() {
        // Checks if there is a block in the way
        var hit_left = false;
        for (let r = 0; r < piece.size; r++) {
            for (let c = 0; c < piece.size; c++){
                if (piece.perm[r][c] > 0) {
                    if (piece.col + c === 0 || grid[piece.row + r][piece.col + c - 1] !== 0) {
                        hit_left = true;
                    };
                    break;
                };
            };
        };
        if (hit_left) {
            return(false);
        };

        // Moves piece leftwards on grid
        var left_grid = grid;
        for (let i = piece.row; i < piece.row + piece.size; i++) {
            for (let j = piece.col; j < piece.col + piece.size; j++) {
                if (left_grid[i][j] !== 0 && piece.perm[i - piece.row][j - piece.col] !== 0) {
                    left_grid[i][j] = 0;
                };
            };
        };
        for (let i = piece.row; i < piece.row + piece.size; i++) {
            for (let j = piece.col - 1; j < piece.col + piece.size - 1; j++) {
                if (left_grid[i][j] === 0) {
                    left_grid[i][j] = piece.perm[i - piece.row][j - piece.col + 1];
                };
            };
        };
        setPiece({
            color : piece.color,
            row : piece.row,
            col : piece.col - 1,
            size : piece.size,
            perm : piece.perm
        });
        setGrid(left_grid);
    };

    // Moves piece
    function move_piece() {
        if (play === true) {
            move_down();
        } else {
        };
    };

    // Counter for the game
    function counter() {
        if (count % 100 === 0 && play) {
            move_piece();
        };
        updateColors();
        setCount(count + 1);
    };

    // Updates color on client-side using current state of grid
    function updateColors() {
        let tetris_grid = document.getElementsByClassName("tetris-screen-display").item(0).childNodes;
        for (let i = 0; i < tetris_grid.length; i++) {
            // Checks each row, from row 0 to 19
            let row = tetris_grid.item(i).childNodes;
            for (let j = 0; j < row.length; j++) {
                let col = row.item(j);
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
                        col.id = "gray";
                };
            };
        };
    };

    // Every second, componentDidUpdate counter, piece
    useEffect(() => {
        const timer = setTimeout(counter, 5);
        // const timer = setInterval(counter, 5);
        // return () => clearInterval(timer);
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
                    <p>Seconds: {Math.floor(count/100)}</p>
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
                    </table>
                </td>
                <td className="next-pieces">
                table-stuff
                </td>
            </tr>
            </table>
            <button onClick={move_left}>
                Move Left
            </button>
            <button onClick={rotate}>
                Rotate
            </button>
            <button onClick={toggle_play}>
                Play/Pause
            </button>
            <button onClick={move_right}>
                Move Right
            </button>
            {/* <button onClick={start_game}>
                Start Game
            </button> */}
        </div>
      </React.Fragment>);
};

// Default export
export default Tetris;