import React from 'react';
import {BrowserRouter, NavLink, Route} from 'react-router-dom';
import './App.css';
import Home from './screens/home';
import Tetris from './screens/tetris';
import Forum from './screens/forum';

// To be updated every 8 hours until a permanent backend port is found
const BACKEND_PORT = "https://77a7ea569910.ngrok.io";

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
                        <p>About</p>
                    </td>
                </tr>
            </table>
            <BrowserRouter basename={window.location.path || ''}>
                <Route path="/" exact={true} component={Home.bind(this, BACKEND_PORT)}/>
                <Route path="/tetris" exact={true} component={Tetris.bind(this, BACKEND_PORT)}/>
                <Route path="/forum" exact={true} component={Forum.bind(this, BACKEND_PORT)}/>
            </BrowserRouter>
            <footer className="footer">
                <p>
                    footer
                </p>
            </footer>
        </div>
    );
}

export default App;
