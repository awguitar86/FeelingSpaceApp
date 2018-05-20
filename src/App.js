import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import Map from './Components/Map/Map';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Route exact path='/' component={Login}/>
          <Route path='/home' component={Home}/>
          <Route path='/map' component={Map}/>
      </div>
    );
  }
}

export default App;
