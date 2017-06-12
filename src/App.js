import React, { Component } from 'react';
import Nav from './components/Nav';
import './App.css';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

class App extends Component {

  render() {

    return (
      <Nav />
    );
  }
}

export default App;
