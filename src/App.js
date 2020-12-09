import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Home from './screens/home';
import Tetris from './screens/tetris';
import Forum from './screens/forum';
import About from './screens/about';

// To be updated every 8 hours until a permanent backend port is found
const BACKEND_PORT = "https://c0464d3e6268.ngrok.io";

function App() {
    return (
        <div className="App">
            <table className="app-header">
                <tr>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <a href="/">Home</a>
                                </td>
                                <td>
                                    <a href="/tetris">Tetris</a>
                                </td>
                                <td>
                                    <a href="/forum">Forum</a>
                                </td>
                            </tr>

                        </table>
                    </td>
                    <td>
                        <p>Gwabbitz Gaming Arcade</p>
                    </td>
                    <td>
                        <a href="/about">About</a>
                    </td>
                </tr>
            </table>
            <BrowserRouter basename={window.location.path || ''}>
                <Route path="/" exact={true} component={Home.bind(this, BACKEND_PORT)}/>
                <Route path="/tetris" exact={true} component={Tetris.bind(this, BACKEND_PORT)}/>
                <Route path="/forum" exact={true} component={Forum.bind(this, BACKEND_PORT)}/>
                <Route path="/about" exact={true} component={About.bind(this, BACKEND_PORT)}/>
            </BrowserRouter>
            <footer className="app-footer">
                <p>
                    Made with ❤ by the<a href="/about" target="_blank">Gwabbitz Gang</a>
                </p>
            </footer>
        </div>
    );
}

export default App;
