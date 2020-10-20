import React from 'react';
import logo from './logo.svg';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Tetris from './screens/tetris';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          header
        </p>
      </header>
      <BrowserRouter>
        <Route path="/" exact={true} component={Tetris}/>
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
