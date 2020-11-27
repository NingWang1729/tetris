import React from 'react';
import '../styles/home.css';

function Home(port_to_backend) {
    const BACKEND_PORT = port_to_backend;
    return (
        <React.Fragment>
            <br/>
            <br/>
            <br/>
            <br/>
            <h1>
                <p>Hello, and Welcome to the Arcade!</p>
            </h1>
            <h2>
                <p>Please use the menu bar for navigation</p>
            </h2>
            <br></br>
            <h2>
                <p> Games </p>
            </h2>
            <div class="row">
                <p>TETRIS!!!</p>
                <p>Tetris again because we dont have any other games oops</p>
            </div>
            <br></br>
            <h2>TOP ARCADE REVIEWS</h2>
            <div class="row">
                <div class="column">
                    <div class="card">
                        <div class="container">
                            <h2>⭐⭐⭐⭐</h2>
                            <p>Bob the Joe</p>
                            <p>Amazing game!</p>
                            <p><button class="likebutton">👍 Good Review</button></p>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="card">
                        <div class="container">
                            <h2>⭐⭐⭐⭐⭐</h2>
                            <p>Kid</p>
                            <p>I think I'm addicted! This is better than
                            fortnite and minecraft.</p>
                            <p><button class="likebutton">👍 Good Review</button></p>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="card">
                        <div class="container">
                            <h2>⭐</h2>
                            <p>Noob</p>
                            <p>Worst game ever. The homepage looks absolutely
                            horrible. What was the developer who made it thinking.</p>
                            <p><button class="likebutton">👍 Good Review</button></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="card">
                        <div class="container">
                            <h2>⭐⭐⭐⭐⭐</h2>
                            <p>Fred</p>
                            <p>The game mechanics are amazing and spot on to the
                            original Tetris game. Good job guys!</p>
                            <p><button class="likebutton">👍 Good Review</button></p>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="card">
                        <div class="container">
                            <h2>⭐⭐⭐</h2>
                            <p>Random Person</p>
                            <p>Interesting</p>
                            <p><button class="likebutton">👍 Good Review</button></p>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="card">
                        <div class="container">
                            <h2>⭐⭐⭐⭐</h2>
                            <p>Dude</p>
                            <p>Is this homepage okay is there anything I need to
                            fix? Not sure if you wanted links to other games as well
                            but just tell me if you need it.</p>
                            <p><button class="likebutton">👍 Good Review</button></p>
                        </div>
                    </div>
                </div>
            </div>
            <p>Please use /tetris for tetris and /forum for forum in url</p>
            <br></br>
            <br></br>

        </React.Fragment>
    );
};

export default Home;
