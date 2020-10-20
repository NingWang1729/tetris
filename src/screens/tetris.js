import React, { useState, useEffect } from 'react';
import  '../styles/tetris.css'

// const [pause, setPause] = useState([true]);

function Tetris() {
    var [play, setPlay] = useState(false);
    var [count, setCount] = useState(0)
    
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
                Instructions Page: "{play.toString()}"
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
                table-stuff
                </td>
                <td className="tetris-screen">
                table-stuff
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