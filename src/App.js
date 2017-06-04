import React, { Component } from 'react';
import Orders from'./components/Orders';
import Revenue from'./components/Revenue';
import { Container } from 'react-bootstrap-grid';
import './App.css';

var style = {
  float: 'left',
  width: '50%'
}

class App extends Component {
  render() {

    return (
      <div>
        <div>
          < Orders />
        </div>
        <div>
          < Revenue />
        </div>
      </div>
    );
  }
}

export default App;
