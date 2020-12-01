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
    var [tspin, setTspin] = useState(false);
    var [difficulty, setDifficulty] = useState(0);
    var [score, setScore] = useState(0);
    var [time, setTime] = useState(0);
    var [order, setOrder] = useState([1, 2, 3, 4, 5, 6, 7]);
    var [play, setPlay] = useState(false);  // Whether game is playing or paused
    var [count, setCount] = useState(0);    // Timer, 1 second per count
    var [piece, setPiece] = useState({});   // Current piece being played
    var [canHold, setCanHold] = useState(true);
    var [hold, setHold] = useState({color : 'hold', perm : [[[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]]});     // Current piece being held
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
        orient : 0,
        perm : [[
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 1],
            [0, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 1, 1],
            [0, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 1, 1],
            [0, 1, 1],
            [0, 0, 0]
        ]
    ]};
    const S_piece = {
        color : "green",
        row : 0,
        col : 3,
        size : 3,
        orient : 0,
        perm : [[
            [0, 2, 2, 0],
            [2, 2, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 2, 0],
            [0, 2, 2],
            [0, 0, 2]
        ],
        [
            [0, 0, 0],
            [0, 2, 2],
            [2, 2, 0]
        ],
        [
            [2, 0, 0],
            [2, 2, 0],
            [0, 2, 0]
        ]
    ]};
    const Z_piece = {
        color : "red",
        row : 0,
        col : 3,
        size : 3,
        orient : 0,
        perm : [[
            [3, 3, 0, 0],
            [0, 3, 3, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 3],
            [0, 3, 3],
            [0, 3, 0]
        ],
        [
            [0, 0, 0],
            [3, 3, 0],
            [0, 3, 3]
        ],
        [
            [0, 3, 0],
            [3, 3, 0],
            [3, 0, 0]
        ]
    ]};
    const T_piece = {
        color : "purple",
        row : 0,
        col : 3,
        size : 3,
        orient : 0,
        perm : [[
            [0, 4, 0, 0],
            [4, 4, 4, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 4, 0],
            [0, 4, 4],
            [0, 4, 0]
        ],
        [
            [0, 0, 0],
            [4, 4, 4],
            [0, 4, 0]
        ],
        [
            [0, 4, 0],
            [4, 4, 0],
            [0, 4, 0]
        ]
    ]};
    const L_piece = {
        color : "orange",
        row : 0,
        col : 3,
        size : 3,
        orient : 0,
        perm : [[
            [0, 0, 5, 0],
            [5, 5, 5, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 5, 0],
            [0, 5, 0],
            [0, 5, 5]
        ],
        [
            [0, 0, 0],
            [5, 5, 5],
            [5, 0, 0]
        ],
        [
            [5, 5, 0],
            [0, 5, 0],
            [0, 5, 0]
        ]
    ]};
    const J_piece = {
        color : "blue",
        row : 0,
        col : 3,
        size : 3,
        orient : 0,
        perm : [[
            [6, 0, 0, 0],
            [6, 6, 6, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 6, 6],
            [0, 6, 0],
            [0, 6, 0]
        ],
        [
            [0, 0, 0],
            [6, 6, 6],
            [0, 0, 6]
        ],
        [
            [0, 6, 0],
            [0, 6, 0],
            [6, 6, 0]
        ]
    ]};
    const I_piece = {
        color : "cyan",
        row : 0,
        col : 3,
        size : 4,
        orient : 0,
        perm : [[
            [0, 0, 0, 0],
            [7, 7, 7, 7],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 7, 0],
            [0, 0, 7, 0],
            [0, 0, 7, 0],
            [0, 0, 7, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [7, 7, 7, 7],
            [0, 0, 0, 0]
        ],
        [
            [0, 7, 0, 0],
            [0, 7, 0, 0],
            [0, 7, 0, 0],
            [0, 7, 0, 0]
        ],
    ]};

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
                    e.preventDefault();
                    movequeue.push(3);//rotate_cw();
                }
                break;
            case 67: // C
                if(play) {
                    movequeue.push(3);//rotate_cw();
                }
                break;
            case 90: // Z
                if(play) {
                    movequeue.push(4);//rotate_ccw();
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
                    e.preventDefault();
                    movequeue.push(2);// soft_drop(); // Move_Down();
                }
                break;
            case 88:
                if(play) {
                    e.preventDefault();
                    movequeue.push(6);//switchHold();
                    movequeue.push(7);//updateHold();
                }
                break;
            case 32: // Space
            case 80: // P
                e.preventDefault();
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
        // Prevents repeatedly holding
        let can_be_held = JSON.parse(JSON.stringify(canHold));
        if (!can_be_held) {
            return false;
        }

        // Remove piece from the grid
        var current_piece = JSON.parse(JSON.stringify(piece));
        var cleaned_grid = JSON.parse(JSON.stringify(grid));
        for (let i = 0; i < current_piece.size; i++) {
            for (let j = 0; j < current_piece.size; j++) {
                if (current_piece.perm[current_piece.orient][i][j] !== 0) {
                    cleaned_grid[current_piece.row + i][current_piece.col + j] = 0;
                };
            };
        };

        // Hold the piece temporarily
        let temp = Object.assign({
            color : current_piece.color,
            row : 0,
            col : 3,
            size : current_piece.size,
            orient : 0,
            perm : current_piece.perm}
        );
        
        // Switch the piece with the held piece
        if (hold.color === 'hold') {
            nextPiece();
        } else {
            setPiece(hold);
            setCanHold(false);
        }
        setGrid(cleaned_grid);
        setHold(temp);
    };

    // TODO: Add points for T-spin, combos
    function checkRows() {
        var check_grid = JSON.parse(JSON.stringify(grid));
        var temp_score = JSON.parse(JSON.stringify(score));
        var temp_difficulty = JSON.parse(JSON.stringify(difficulty));
        var cleared_lines = 0;
        for (let r = 0; r < 23; r++) {
            let product = 1;
            for (let c = 0; c < 10; c++) {
                product *= check_grid[r][c];
            }
            if (product !== 0) {
                check_grid.splice(r, 1);
                check_grid.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                cleared_lines++;
            }
        }
        // Old Score calculator...
        // if(cleared_lines > 0) {
        //     setScore(score + 100 + (cleared_lines > 1 ? 200 * (cleared_lines-1): 0)
        //                       + (cleared_lines == 4 ? 100 : 0));
        // }
        if(tspin) {
            setScore(temp_score+400 + 400*Math.min(cleared_lines, 3));
        }else {
            switch (cleared_lines) {
                case 1:
                    setScore(temp_score + 40 * (Math.floor(temp_difficulty / 10) + 1))
                    break;
                case 2:
                    setScore(temp_score + 100 * (Math.floor(temp_difficulty / 10) + 1))
                    break;
                case 3:
                    setScore(temp_score + 300 * (Math.floor(temp_difficulty / 10) + 1))
                    break;
                case 4:
                    setScore(temp_score + 1200 * (Math.floor(temp_difficulty / 10) + 1))
                    break;
                default:
                    setScore(temp_score);
                    break;
            }
        }
        setDifficulty(Math.min(temp_difficulty + cleared_lines, 160));
        setGrid(check_grid);
    }

    // Randomly Generates the next piece to play
    // Runs once at very start
    // TODO: Have a display of upcoming pieces
    function nextPiece() {
        let temp = order.splice(Math.floor(order.length * Math.random()), 1)[0];
        if (order.length === 0) {
            setOrder([1, 2, 3, 4, 5, 6, 7]);
        }
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
                setPiece(Object.assign(I_piece));
                break;
        };
        checkRows();
    };

    // Rotates the current piece held clockwise
    function rotate_cw() {
        // O piece cannot rotate
        // Rotations cannot occur when paused
        if (piece.perm[0][1][1] === 1 || !play) {
            return(false);
        }

        if (hit_bottom()) {
            if (piece.col > 0 && piece.perm[1][1] === 4 && piece.perm[1][0] === 0 && grid[piece.row + 1][piece.col] === 0) {
                setTspin(true);
            }
        }
        // Deletes old piece
        // This should give grid minus the current piece.
        var cleaned_grid = JSON.parse(JSON.stringify(grid));
        for (let i = 0; i < piece.size; i++) {
            for (let j = 0; j < piece.size; j++) {
                if (piece.perm[piece.orient][i][j] !== 0) {
                    cleaned_grid[piece.row + i][piece.col + j] = 0;
                };
            };
        };

        // increasing orientation will move the permutation of the piece
        var new_orient = (piece.orient + 1) % 4

        // test if each wall kick can allow a rotation
        // if can_rotate is ever true after a wallkick, others will never trigger
        function try_rotation(row, col) {
            for (let i = 0; i < piece.size; i++) {
                for (let j = 0; j < piece.size; j++) {
                    if (piece.perm[new_orient][i][j] === 0) {
                        continue;
                    } else if (row + i < 0 || row + i > 22 || col + j < 0 || col + j > 9 || cleaned_grid[row + i][col + j] !== 0) {
                        return false;
                    };
                };
            };
            return true;
        };

        // Implement the rotation if it can be done
        function do_rotation(row, col) {
            for (let i = 0; i < piece.size; i++) {
                for (let j = 0; j < piece.size; j++) {
                    if (piece.perm[new_orient][i][j] !== 0 && cleaned_grid[row + i][col + j] === 0) {
                        cleaned_grid[row + i][col + j] = piece.perm[new_orient][i][j];
                    };
                };
            };
            setPiece({row : row,
                col : col,
                size : piece.size,
                orient : new_orient,
                perm : piece.perm});
            setGrid(cleaned_grid);
            return true;
        };

        // Start off with false.
        var can_rotate = false;

        // Wall kick 0
        if (!can_rotate) {
            can_rotate = try_rotation(piece.row, piece.col);
            if (can_rotate) {
                do_rotation(piece.row, piece.col);
            };
        };

        // Wall kick 1
        if (!can_rotate){
            if (piece.perm[0][1][1] === 7){
                switch (piece.orient) {
                    case 0:
                        can_rotate = try_rotation(piece.row, piece.col - 2);
                        if (can_rotate) {
                            do_rotation(piece.row, piece.col - 2);
                        };
                        break;
                    case 1:
                        can_rotate = try_rotation(piece.row, piece.col - 1);
                        if (can_rotate) {
                            do_rotation(piece.row, piece.col - 1);
                        };
                        break;
                    case 2:
                        can_rotate = try_rotation(piece.row, piece.col + 2);
                        if (can_rotate) {
                            do_rotation(piece.row, piece.col + 2);
                        };
                        break;
                    case 3:
                        can_rotate = try_rotation(piece.row, piece.col + 1);
                        if (can_rotate) {
                            do_rotation(piece.row, piece.col + 1);
                        };
                        break;
                    default:
                        alert("Something went horribly wrong with the rotation!");
                        break;
                };
            } else {
                switch (piece.orient) {
                    case 0:
                        can_rotate = try_rotation(piece.row, piece.col - 1);
                        if (can_rotate) {
                            do_rotation(piece.row, piece.col - 1);
                        };
                        break;
                    case 1:
                        can_rotate = try_rotation(piece.row, piece.col + 1);
                        if (can_rotate) {
                            do_rotation(piece.row, piece.col + 1);
                        };
                        break;
                    case 2:
                        can_rotate = try_rotation(piece.row, piece.col + 1);
                        if (can_rotate) {
                            do_rotation(piece.row, piece.col + 1);
                        };
                        break;
                    case 3:
                        can_rotate = try_rotation(piece.row, piece.col - 1);
                        if (can_rotate) {
                            do_rotation(piece.row, piece.col - 1);
                        };
                        break;
                    default:
                        alert("Something went horribly wrong with the rotation!");
                        break;
                };
            };
        };

        // Wall kick 2
        if (!can_rotate){
            if (piece.perm[0][1][1] === 7) {
                switch (piece.orient) {
                    case 0:
                        can_rotate = try_rotation(piece.row, piece.col + 1);
                        if (can_rotate) {
                            do_rotation(piece.row, piece.col + 1);
                        };
                        break;
                    case 1:
                        can_rotate = try_rotation(piece.row, piece.col + 2);
                        if (can_rotate) {
                            do_rotation(piece.row, piece.col + 2);
                        };
                        break;
                    case 2:
                        can_rotate = try_rotation(piece.row, piece.col - 1);
                        if (can_rotate) {
                            do_rotation(piece.row, piece.col - 1);
                        };
                        break;
                    case 3:
                        can_rotate = try_rotation(piece.row, piece.col - 2);
                        if (can_rotate) {
                            do_rotation(piece.row, piece.col - 2);
                        };
                        break;
                    default:
                        alert("Something went horribly wrong with the rotation!");
                        break;
                };
            } else {
                switch (piece.orient) {
                    case 0:
                        can_rotate = try_rotation(piece.row - 1, piece.col - 1);
                        if (can_rotate) {
                            do_rotation(piece.row - 1, piece.col - 1);
                        };
                        break;
                    case 1:
                        can_rotate = try_rotation(piece.row + 1, piece.col + 1);
                        if (can_rotate) {
                            do_rotation(piece.row + 1, piece.col + 1);
                        };
                        break;
                    case 2:
                        can_rotate = try_rotation(piece.row - 1, piece.col + 1);
                        if (can_rotate) {
                            do_rotation(piece.row - 1, piece.col + 1);
                        };
                        break;
                    case 3:
                        can_rotate = try_rotation(piece.row + 1, piece.col - 1);
                        if (can_rotate) {
                            do_rotation(piece.row + 1, piece.col - 1);
                        };
                        break;
                    default:
                        alert("Something went horribly wrong with the rotation!");
                        break;
                };
            };
        };

        // Wall kick 3
        if (!can_rotate){
            if (piece.perm[0][1][1] === 7) {
                switch (piece.orient) {
                    case 0:
                        can_rotate = try_rotation(piece.row + 1, piece.col - 2);
                        if (can_rotate) {
                            do_rotation(piece.row + 1, piece.col - 2);
                        };
                        break;
                    case 1:
                        can_rotate = try_rotation(piece.row - 2, piece.col - 1);
                        if (can_rotate) {
                            do_rotation(piece.row - 2, piece.col - 1);
                        };
                        break;
                    case 2:
                        can_rotate = try_rotation(piece.row - 1, piece.col + 2);
                        if (can_rotate) {
                            do_rotation(piece.row - 1, piece.col + 2);
                        };
                        break;
                    case 3:
                        can_rotate = try_rotation(piece.row + 2, piece.col + 1);
                        if (can_rotate) {
                            do_rotation(piece.row - 2, piece.col + 1);
                        };
                        break;
                    default:
                        alert("Something went horribly wrong with the rotation!");
                        break;
                };
            } else {
                switch (piece.orient) {
                    case 0:
                        can_rotate = try_rotation(piece.row + 2, piece.col);
                        if (can_rotate) {
                            do_rotation(piece.row + 2, piece.col);
                        };
                        break;
                    case 1:
                        can_rotate = try_rotation(piece.row - 2, piece.col);
                        if (can_rotate) {
                            do_rotation(piece.row - 2, piece.col);
                        };
                        break;
                    case 2:
                        can_rotate = try_rotation(piece.row + 2, piece.col);
                        if (can_rotate) {
                            do_rotation(piece.row + 2, piece.col);
                        };
                        break;
                    case 3:
                        can_rotate = try_rotation(piece.row - 2, piece.col);
                        if (can_rotate) {
                            do_rotation(piece.row - 2, piece.col);
                        };
                        break;
                    default:
                        alert("Something went horribly wrong with the rotation!");
                        break;
                };
            };
        };

        // Wall kick 4
        if (!can_rotate){
            if (piece.perm[0][1][1] === 7) {
                switch (piece.orient) {
                    case 0:
                        can_rotate = try_rotation(piece.row - 2, piece.col + 1);
                        if (can_rotate) {
                            do_rotation(piece.row - 2, piece.col -+1);
                        };
                        break;
                    case 1:
                        can_rotate = try_rotation(piece.row + 1, piece.col + 2);
                        if (can_rotate) {
                            do_rotation(piece.row + 1, piece.col + 2);
                        };
                        break;
                    case 2:
                        can_rotate = try_rotation(piece.row - 2, piece.col - 1);
                        if (can_rotate) {
                            do_rotation(piece.row - 2, piece.col - 1);
                        };
                        break;
                    case 3:
                        can_rotate = try_rotation(piece.row - 1, piece.col - 2);
                        if (can_rotate) {
                            do_rotation(piece.row - 1, piece.col - 2);
                        };
                        break;
                    default:
                        alert("Something went horribly wrong with the rotation!");
                        break;
                };
            } else {
                switch (piece.orient) {
                    case 0:
                        can_rotate = try_rotation(piece.row + 2, piece.col - 1);
                        if (can_rotate) {
                            do_rotation(piece.row + 2, piece.col - 1);
                        };
                        break;
                    case 1:
                        can_rotate = try_rotation(piece.row - 2, piece.col + 1);
                        if (can_rotate) {
                            do_rotation(piece.row - 2, piece.col + 1);
                        };
                        break;
                    case 2:
                        can_rotate = try_rotation(piece.row + 2, piece.col + 1);
                        if (can_rotate) {
                            do_rotation(piece.row + 2, piece.col + 1);
                        };
                        break;
                    case 3:
                        can_rotate = try_rotation(piece.row - 2, piece.col - 1);
                        if (can_rotate) {
                            do_rotation(piece.row - 2, piece.col - 1);
                        };
                        break;
                    default:
                        alert("Something went horribly wrong with the rotation!");
                        break;
                }
            }
        }
    }

    function hit_bottom() {
        for (let c = 0; c < piece.size; c++) {
            for (let r = piece.size - 1; r > -1; r--){
                if (piece.perm[piece.orient][r][c] > 0) {
                    if (grid[piece.row + r + 1][piece.col + c] !== 0) {
                        setCanHold(true);
                        return true;
                    }
                  break;
                }
            }
        }
        return false;
    }

    // Rotates the current piece held counter-clockwise
    function rotate_ccw() {
        // O piece cannot rotate
        // Rotations cannot occur when paused
        if (piece.perm[0][1][1] === 1 || !play) {
            return(false);
        }

        if (hit_bottom()) {
            if (piece.col > 0 && piece.perm[1][1] === 4 && piece.perm[1][0] === 0 && grid[piece.row + 1][piece.col] === 0) {
                setTspin(true);
            }
        }

        // Deletes old piece
        // This should give grid minus the current piece.
        var cleaned_grid = JSON.parse(JSON.stringify(grid));
        for (let i = 0; i < piece.size; i++) {
            for (let j = 0; j < piece.size; j++) {
                if (piece.perm[piece.orient][i][j] !== 0) {
                    cleaned_grid[piece.row + i][piece.col + j] = 0;
                };
            };
        };

        // increasing orientation will move the permutation of the piece
        var new_orient = (piece.orient + 3) % 4

        // test if each wall kick can allow a rotation
        // if can_rotate is ever true after a wallkick, others will never trigger
        function try_rotation(row, col) {
            for (let i = 0; i < piece.size; i++) {
                for (let j = 0; j < piece.size; j++) {
                    if (piece.perm[new_orient][i][j] === 0) {
                        continue;
                    } else if (row + i < 0 || row + i > 22 || col + j < 0 || col + j > 9 || cleaned_grid[row + i][col + j] !== 0) {
                        return false;
                    };
                };
            };
            return true;
        };

        // Implement the rotation if it can be done
        function do_rotation(row, col) {
            for (let i = 0; i < piece.size; i++) {
                for (let j = 0; j < piece.size; j++) {
                    if (piece.perm[new_orient][i][j] !== 0 && cleaned_grid[row + i][col + j] === 0) {
                        cleaned_grid[row + i][col + j] = piece.perm[new_orient][i][j];
                    };
                };
            };
            setPiece({row : row,
                col : col,
                size : piece.size,
                orient : new_orient,
                perm : piece.perm});
            setGrid(cleaned_grid);
            return true;
        };

        // Start off with false.
        var can_rotate = false;

        // Wall kick 0
        if (!can_rotate) {
            can_rotate = try_rotation(piece.row, piece.col);
            if (can_rotate) {
                do_rotation(piece.row, piece.col);
            };
        };

        // Wall kick 1
        if (!can_rotate){
            if (piece.perm[0][1][1] === 7) {
                switch (piece.orient) {
                    case 0:
                        can_rotate = try_rotation(piece.row, piece.col - 1);
                        if (can_rotate) {
                            do_rotation(piece.row, piece.col - 1);
                        };
                        break;
                    case 1:
                        can_rotate = try_rotation(piece.row, piece.col + 2);
                        if (can_rotate) {
                            do_rotation(piece.row, piece.col + 2);
                        };
                        break;
                    case 2:
                        can_rotate = try_rotation(piece.row, piece.col + 1);
                        if (can_rotate) {
                            do_rotation(piece.row, piece.col + 1);
                        };
                        break;
                    case 3:
                        can_rotate = try_rotation(piece.row, piece.col - 2);
                        if (can_rotate) {
                            do_rotation(piece.row, piece.col - 2);
                        };
                        break;
                    default:
                        alert("Something went horribly wrong with the rotation!");
                        break;
                };
            } else {
                switch (piece.orient) {
                    case 0:
                        can_rotate = try_rotation(piece.row, piece.col + 1);
                        if (can_rotate) {
                            do_rotation(piece.row, piece.col + 1);
                        };
                        break;
                    case 1:
                        can_rotate = try_rotation(piece.row, piece.col + 1);
                        if (can_rotate) {
                            do_rotation(piece.row, piece.col + 1);
                        };
                        break;
                    case 2:
                        can_rotate = try_rotation(piece.row, piece.col - 1);
                        if (can_rotate) {
                            do_rotation(piece.row, piece.col - 1);
                        };
                        break;
                    case 3:
                        can_rotate = try_rotation(piece.row, piece.col - 1);
                        if (can_rotate) {
                            do_rotation(piece.row, piece.col - 1);
                        };
                        break;
                    default:
                        alert("Something went horribly wrong with the rotation!");
                        break;
                };
            };
        };

        // Wall kick 2
        if (!can_rotate){
            if (piece.perm[0][1][1] === 7) {
                switch (piece.orient) {
                    case 0:
                        can_rotate = try_rotation(piece.row, piece.col + 2);
                        if (can_rotate) {
                            do_rotation(piece.row, piece.col + 2);
                        };
                        break;
                    case 1:
                        can_rotate = try_rotation(piece.row, piece.col - 1);
                        if (can_rotate) {
                            do_rotation(piece.row, piece.col - 1);
                        };
                        break;
                    case 2:
                        can_rotate = try_rotation(piece.row, piece.col - 2);
                        if (can_rotate) {
                            do_rotation(piece.row, piece.col - 2);
                        };
                        break;
                    case 3:
                        can_rotate = try_rotation(piece.row, piece.col + 1);
                        if (can_rotate) {
                            do_rotation(piece.row, piece.col + 1);
                        };
                        break;
                    default:
                        alert("Something went horribly wrong with the rotation!");
                        break;
                };
            } else {
                switch (piece.orient) {
                    case 0:
                        can_rotate = try_rotation(piece.row - 1, piece.col + 1);
                        if (can_rotate) {
                            do_rotation(piece.row - 1, piece.col + 1);
                        };
                        break;
                    case 1:
                        can_rotate = try_rotation(piece.row + 1, piece.col + 1);
                        if (can_rotate) {
                            do_rotation(piece.row + 1, piece.col + 1);
                        };
                        break;
                    case 2:
                        can_rotate = try_rotation(piece.row - 1, piece.col - 1);
                        if (can_rotate) {
                            do_rotation(piece.row - 1, piece.col - 1);
                        };
                        break;
                    case 3:
                        can_rotate = try_rotation(piece.row + 1, piece.col - 1);
                        if (can_rotate) {
                            do_rotation(piece.row + 1, piece.col - 1);
                        };
                        break;
                    default:
                        alert("Something went horribly wrong with the rotation!");
                        break;
                };
            };
        };

        // Wall kick 3
        if (!can_rotate){
            if (piece.perm[0][1][1] === 7) {
                switch (piece.orient) {
                    case 0:
                        can_rotate = try_rotation(piece.row - 2, piece.col - 1);
                        if (can_rotate) {
                            do_rotation(piece.row - 2, piece.col - 1);
                        };
                        break;
                    case 1:
                        can_rotate = try_rotation(piece.row - 1, piece.col + 2);
                        if (can_rotate) {
                            do_rotation(piece.row - 1, piece.col + 2);
                        };
                        break;
                    case 2:
                        can_rotate = try_rotation(piece.row + 2, piece.col + 1);
                        if (can_rotate) {
                            do_rotation(piece.row + 2, piece.col + 1);
                        };
                        break;
                    case 3:
                        can_rotate = try_rotation(piece.row - 1, piece.col - 2);
                        if (can_rotate) {
                            do_rotation(piece.row - 1, piece.col - 2);
                        };
                        break;
                    default:
                        alert("Something went horribly wrong with the rotation!");
                        break;
                };
            } else {
                switch (piece.orient) {
                    case 0:
                        can_rotate = try_rotation(piece.row + 2, piece.col);
                        if (can_rotate) {
                            do_rotation(piece.row + 2, piece.col);
                        };
                        break;
                    case 1:
                        can_rotate = try_rotation(piece.row - 2, piece.col);
                        if (can_rotate) {
                            do_rotation(piece.row - 2, piece.col);
                        };
                        break;
                    case 2:
                        can_rotate = try_rotation(piece.row + 2, piece.col);
                        if (can_rotate) {
                            do_rotation(piece.row + 2, piece.col);
                        };
                        break;
                    case 3:
                        can_rotate = try_rotation(piece.row - 2, piece.col);
                        if (can_rotate) {
                            do_rotation(piece.row - 2, piece.col);
                        };
                        break;
                    default:
                        alert("Something went horribly wrong with the rotation!");
                        break;
                };
            };
        };

        // Wall kick 4
        if (!can_rotate){
            if (piece.perm[0][1][1] === 7) {
                switch (piece.orient) {
                    case 0:
                        can_rotate = try_rotation(piece.row + 1, piece.col + 2);
                        if (can_rotate) {
                            do_rotation(piece.row + 1, piece.col + 2);
                        };
                        break;
                    case 1:
                        can_rotate = try_rotation(piece.row + 2, piece.col - 1);
                        if (can_rotate) {
                            do_rotation(piece.row + 2, piece.col - 1);
                        };
                        break;
                    case 2:
                        can_rotate = try_rotation(piece.row + 1, piece.col - 2);
                        if (can_rotate) {
                            do_rotation(piece.row + 1, piece.col - 2);
                        };
                        break;
                    case 3:
                        can_rotate = try_rotation(piece.row - 2, piece.col + 1);
                        if (can_rotate) {
                            do_rotation(piece.row - 2, piece.col + 1);
                        };
                        break;
                    default:
                        alert("Something went horribly wrong with the rotation!");
                        break;
                };
            } else {
                switch (piece.orient) {
                    case 0:
                        can_rotate = try_rotation(piece.row + 2, piece.col + 1);
                        if (can_rotate) {
                            do_rotation(piece.row + 2, piece.col + 1);
                        };
                        break;
                    case 1:
                        can_rotate = try_rotation(piece.row - 2, piece.col + 1);
                        if (can_rotate) {
                            do_rotation(piece.row - 2, piece.col + 1);
                        };
                        break;
                    case 2:
                        can_rotate = try_rotation(piece.row + 2, piece.col - 1);
                        if (can_rotate) {
                            do_rotation(piece.row + 2, piece.col - 1);
                        };
                        break;
                    case 3:
                        can_rotate = try_rotation(piece.row - 2, piece.col - 1);
                        if (can_rotate) {
                            do_rotation(piece.row - 2, piece.col - 1);
                        };
                        break;
                    default:
                        alert("Something went horribly wrong with the rotation!");
                        break;
                };
            };
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
        if (hit_bottom()) {
            if (piece.row === 0) {
                alert("GAME OVER!");
                let final_score = JSON.parse(JSON.stringify(score));
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
                setScore(0);
                setDifficulty(0);
                setTime(0);
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
                    body: JSON.stringify({ score : final_score })
                });
                return(false);
            };
            nextPiece();
            return(false);
        };
        // Moves piece downwards on grid
        var next_grid = grid;
        for (let i = piece.row; i < piece.row + piece.size; i++) {
            for (let j = piece.col; j < piece.col + piece.size; j++) {
                if (next_grid[i][j] !== 0 && piece.perm[piece.orient][i - piece.row][j - piece.col] !== 0) {
                    next_grid[i][j] = 0;
                };
            };
        };
        for (let i = piece.row + 1; i < piece.row + piece.size + 1; i++) {
            for (let j = piece.col; j < piece.col + piece.size; j++) {
                if (next_grid[i][j] === 0) {
                    next_grid[i][j] = piece.perm[piece.orient][i - piece.row - 1][j - piece.col];
                };
            };
        };
        setPiece({
            color : piece.color,
            row : piece.row + 1,
            col : piece.col,
            size : piece.size,
            orient : piece.orient,
            perm : piece.perm
        });
        setGrid(next_grid);
        return(true);
    };

    function hard_drop() {
        if(!play){
          return;
        }
        if (!hit_bottom()) {
            setScore(score+1);
            move_down();
            hard_drop();
        }
    }

    // Moves piece rightwards by one
    function move_right() {
        if (!play) {
            return false;
        };
        // Checks if there is a block in the way
        var hit_right = false;
        for (let r = 0; r < piece.size; r++) {
            for (let c = piece.size - 1; c > -1; c--){
                if (piece.perm[piece.orient][r][c] > 0) {
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
                if (right_grid[i][j] !== 0 && piece.perm[piece.orient][i - piece.row][j - piece.col] !== 0) {
                    right_grid[i][j] = 0;
                };
            };
        };
        for (let i = piece.row; i < piece.row + piece.size; i++) {
            for (let j = piece.col + 1; j < piece.col + piece.size + 1; j++) {
                if (right_grid[i][j] === 0) {
                    right_grid[i][j] = piece.perm[piece.orient][i - piece.row][j - piece.col - 1];
                };
            };
        };
        setPiece({
            color : piece.color,
            row : piece.row,
            col : piece.col + 1,
            size : piece.size,
            orient : piece.orient,
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
                if (piece.perm[piece.orient][r][c] > 0) {
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
                if (left_grid[i][j] !== 0 && piece.perm[piece.orient][i - piece.row][j - piece.col] !== 0) {
                    left_grid[i][j] = 0;
                };
            };
        };
        for (let i = piece.row; i < piece.row + piece.size; i++) {
            for (let j = piece.col - 1; j < piece.col + piece.size - 1; j++) {
                if (left_grid[i][j] === 0) {
                    left_grid[i][j] = piece.perm[piece.orient][i - piece.row][j - piece.col + 1];
                };
            };
        };
        setPiece({
            color : piece.color,
            row : piece.row,
            col : piece.col - 1,
            size : piece.size,
            orient : piece.orient,
            perm : piece.perm
        });
        setGrid(left_grid);
    };

    // Counter for the game
    function counter() {
        if (play) {
            if(count % (200-difficulty) === 0) {
                moves.push(5);
            }
            if(moves.length !== 0) {
                switch(moves.shift()) {
                    case 0:
                        move_left();
                        break;
                    case 1:
                        move_right();
                        break;
                    case 3:
                        rotate_cw();
                        break;
                    case 4:
                        rotate_ccw();
                        break;
                    case 2:
                        setScore(score+1); // Soft drop uses move_down()
                    case 5:
                        move_down();
                        break;
                    case 6:
                        switchHold();
                        break;
                    case 7:
                        updateHold();
                        break;
                    default:
                        alert("Invalid keyboard or command input.");
                        break;
                }
            }
            setTime(time+1);
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

    function updateHold() {
        let hold_grid = document.getElementsByClassName("hold-piece-display").item(0).childNodes;
        for (let i = 0; i < hold_grid.length; i++) {
            // Checks each row
            let row = hold_grid.item(i).childNodes;
            for (let j = 0; j < row.length; j++) {
                let col = row.item(j);
                switch (hold.perm[0][i][j]) {
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
        setTimeout(counter, 1);
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
                        <td className="instructions-page">
                            <h1>Instructions:</h1>
                            <br/>
                            <p> Pieces will come down from the top of the screen.
                            Rotate pieces and move them left and right with the arrow keys.
                            If a row is filled with squares, it will disappear. When a piece
                            reaches the top of the grid, the game is over. Try to get the highest
                            score possible and good luck! </p>
                            <br/>
                            <p>Z to rotate left, X to hold, C to rotate right</p>
                            <p>A/D or Left/Right Arrows to move Left or Right</p>
                            <p>W/S or Up/Down Arrows to rotate CW or Softdrop</p>
                            <p>Spacebar or P to pause or unpause the game</p>
                            <br/>
                            <p>Score:   {score}</p>
                            <p>Level:   {Math.floor(difficulty / 10)}</p>
                            <p>{play ? "Playing" : "Paused"}</p>
                        </td>
                        <td className="tetris-screen">
                            <table className="tetris-container">
                                <tr>
                                    <td className="tetris-game-container">
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
                                    <td className="hold-piece-container">
                                        <p className="hold-piece-descriptor">Hold Piece:</p>
                                        <table className="hold-piece-display">
                                            {hold.perm[0].slice(0, 3).map((row, row_index) =>
                                                <tr className="hold-piece-row">
                                                    {row.map((col, col_index) =>
                                                        <td  id={`${col}`} className={`${row_index}-${col_index}`}>{col}</td>
                                                    )}
                                                </tr>
                                            )}
                                        </table>
                                    </td>
                                </tr>
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
                <button onClick={rotate_cw}>
                    Rotate
                </button>
                <button onClick={toggle_play}>
                    Play/Pause
                </button>
                <button onClick={move_right}>
                    Move Right
                </button>
            </div>
        </React.Fragment>);
};

// Default export
export default Tetris;
