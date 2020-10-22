import React from 'react';
import logo from './logo.svg';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Tetris from './screens/tetris';
import Forum from './screens/forum'


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
        <Route path="/forum" exact={true} component={Forum}/>
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
