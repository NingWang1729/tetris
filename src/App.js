import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Tetris from './screens/tetris';
import Forum from './screens/forum'

// To be updated every 8 hours until a permanent backend port is found
const BACKEND_PORT = "https://d05722dfdb2e.ngrok.io";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          header
        </p>
      </header>
      <BrowserRouter>
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
