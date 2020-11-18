import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Home from './screens/home';
import Tetris from './screens/tetris';
import Forum from './screens/forum';

// To be updated every 8 hours until a permanent backend port is found
const BACKEND_PORT = "https://8afbbf247023.ngrok.io";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    header
                </p>
            </header>
            <BrowserRouter basename={window.location.path || ''}>
                <Route path="/" exact={true} component={Home.bind(this, BACKEND_PORT)}/>
                <Route path="/tetris" exact={true} component={Tetris.bind(this, BACKEND_PORT)}/>
                <Route path="/forum" exact={true} component={Forum.bind(this, BACKEND_PORT)}/>
            </BrowserRouter>
            <footer>
                <p>
                    footer
                </p>
            </footer>
        </div>
    );
}

export default App;
