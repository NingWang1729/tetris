import React, { useState, useEffect } from 'react';
import dateformat from 'dateformat';
import  '../styles/tetris.css';

function Tetris(port_to_backend) {
    const BACKEND_PORT = port_to_backend;
    var [leaderboard, setLeaderboard] = useState([]);
    useEffect(() => {
        fetch(`${BACKEND_PORT}/tetris_leaderboard/`)
            .then((response) => {
                response.json().then((data) => {
                    let lb = [];
                    for (let i = 0; i < data.length; i++) {
                        console.log(data[i]);
                        let ranking = { id : data[i].id, score : data[i].score, date : new Date(data[i].date)}
                        lb.push(JSON.stringify(ranking));
                    }
                    setLeaderboard(lb);
                });
        });
    }, []);

    var [moves, setMoves] = useState([]);
    var [order, setOrder] = useState([1, 2, 3, 4, 5, 6, 7]);
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
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7], //Row 25 Serves To Act As Lower Bound
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
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
            [0, 1, 1],
            [0, 1, 1],
            [0, 0, 0]
        ]
    };
    const S_piece = {
        color : "green",
        row : 0,
        col : 3,
        size : 3,
        perm : [
            [0, 2, 2],
            [2, 2, 0],
            [0, 0, 0]
        ]
    };
    const Z_piece = {
        color : "red",
        row : 0,
        col : 3,
        size : 3,
        perm : [
            [3, 3, 0],
            [0, 3, 3],
            [0, 0, 0]
        ]
    };
    const T_piece = {
        color : "purple",
        row : 0,
        col : 3,
        size : 3,
        perm : [
            [0, 4, 0],
            [4, 4, 4],
            [0, 0, 0]
        ]
    };
    const L_piece = {
        color : "orange",
        row : 0,
        col : 3,
        size : 3,
        perm : [
            [0, 0, 5],
            [5, 5, 5],
            [0, 0, 0]
        ]
    };
    const J_piece = {
        color : "blue",
        row : 0,
        col : 3,
        size : 3,
        perm : [
            [6, 0, 0],
            [6, 6, 6],
            [0, 0, 0]
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

    document.onkeydown = function(e) {
        var movequeue = moves;
        switch(e.which) {
            case 37: // Left
            case 65: // A
                if(play) {
                    movequeue.push(0);//move_left();
                }
                break;
            case 38: // up
            case 82: // R
            case 87: // W
                if(play) {
                    movequeue.push(3);//rotate();
                }
                break;
            case 39: // Right
            case 68: // D
                if(play) {
                    movequeue.push(1);// = move_right();
                }
                break;
            case 40: // Down
            case 83: // S
                if(play) {
                    movequeue.push(2);//fast_drop();
                }
                break;
            case 32: // Space
            case 80: // P
                let sound = document.getElementById("tetris-theme");
                if (play) {
                    sound.pause();
                } else {
                    sound.play();
                };
                setPlay(!play);
                break;
            default: return; // exit this handler for other keys
        }
        setMoves(movequeue);
        // e.preventDefault(); // prevent the default action (scroll / move caret)
    };

    // Switches the piece being played with the piece being held
    // TODO: Start piece back at the top
    // TODO: Ensure one one switch is possible per placement
    function switchHold() {
        let temp = Object.assign({}, piece);
        setPiece(hold);
        setHold(temp);
    };

    function checkRows() {
        var check_grid = grid;
        for (let r = 0; r < 23; r++) {
            let product = 1;
            for (let c = 0; c < 10; c++) {
                product *= check_grid[r][c];
            };
            if (product !== 0) {
                check_grid.splice(r, 1);
                check_grid.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            };
        };
        setGrid(check_grid);
    };

    // Randomly Generates the next piece to play
    // Runs once at very start
    // TODO: Have a display of upcoming pieces
    function nextPiece() {
        let temp = order.splice(Math.floor(order.length * Math.random()), 1)[0];
        if (order.length === 0) {
            setOrder([1, 2, 3, 4, 5, 6, 7]);
        };
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
            case 7:
                setPiece(Object.assign(I_piece));
                break;
            default:
                setPiece(Object.assign(T_piece));
        };
        checkRows();
    };

    // Rotates the current piece held
    // TODO: Ensure the rotation does not cause collision
    function rotate() {
        // O piece cannot rotate
        if (piece.perm[1][1] === 1 || !play) {
            return(false);
        };

        let hit_bottom = false;
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
            let tspin_grid = grid;
            if (piece.col > 0 && piece.perm[1][1] === 4 && piece.perm[1][0] === 0 && tspin_grid[piece.row + 1][piece.col] === 0) {
                piece.perm[1][0] = 4;
                piece.perm[0][1] = 0;
                let t_grid = grid;
                t_grid[piece.row + 1][piece.col] = 4;
                t_grid[piece.row][piece.col + 1] = 0;
                setGrid(t_grid);
            };
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

        //Rotates old piece
        let rotated = [];
        for (let i = 0; i < piece.size; i++) {
            let temp = [];
            for (let j = 0; j < piece.size; j++) {
                temp.push(piece.perm[piece.size - j - 1][i]);
            };
            rotated.push(temp);
        };

        let can_rotate = true;
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
            setPiece({row : piece.row,
                col : piece.col,
                size : piece.size,
                perm : rotated});
            setGrid(cleaned_grid);
        } else {
            setPiece({row : piece.row,
                col : piece.col,
                size : piece.size,
                perm : piece.perm});
            setGrid(grid);
        };
    };

    // Pauses and unpauses game
    function toggle_play() {
        let sound = document.getElementById("tetris-theme");
        if (play) {
            sound.pause();
        } else {
            sound.play();
        };
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
            if (piece.row === 0) {
                alert("GAME OVER!");
                setGrid([
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
                setMoves([]);
                toggle_play();
                let sound = document.getElementById("tetris-theme");
                sound.load();
                sound.pause();
                fetch(`${BACKEND_PORT}/tetris_leaderboard/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ score : count })
                });
                return(false);
            }
            nextPiece();
            return(false);
        };
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
        return(true);
    };

    function fast_drop() {
        if(!play){
          return;
        }

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
        if (!hit_bottom) {
            move_down();
            fast_drop();
        }
    };

    // Moves piece rightwards by one
    function move_right() {
        if (!play) {
            return false;
        };
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
        if (!play) {
            return false;
        };
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
        }
    };

    // Counter for the game
    function counter() {
        if (play) {
            if(count % 200 === 0) {
                moves.push(2);
            }
            if(moves.length !== 0) {
                switch(moves.shift()) { //0 - left, 1 - right, 2 - down, 3 - rotate
                    case 0:
                        move_left();
                        break;
                    case 1:
                        move_right();
                        break;
                    case 2:
                        move_down();
                        break;
                    case 3:
                        rotate();
                        break;
                    break;
                }
            }
        }
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
        const timer = setTimeout(counter, 1);
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
            <br/>
            <br/>
            <br/>
            <div className="tetris-screen-container">
                <audio id="tetris-theme" autoPlay loop>
                    <source src="https://ia800504.us.archive.org/33/items/TetrisThemeMusic/Tetris.mp3" type="audio/mpeg"/>
                    Your browser does not support the audio element.
                </audio>
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
                            <p>Seconds: {Math.floor(count/420)}</p>
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
                            <table className='tetris-leaderboard'>
                                <tr className='leaderboard-heading-1'>
                                    <td colSpan={2}><b>Leaderboard</b></td>
                                </tr>
                                <tr className='leaderboard-heading-2'>
                                    <td><b>Score:</b></td>
                                    <td><b>Date:</b></td>
                                </tr>
                                {leaderboard.map((rank) =>
                                    <tr className='leaderboard-ranking' id={JSON.parse(rank).id}>
                                        <td>{JSON.parse(rank).score}</td>
                                        <td>{dateformat(JSON.parse(rank).date, 'mm/dd/yyyy hh:MM:ss')}</td>
                                    </tr>
                                )}
                            </table>
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
