import React, { Component } from 'react';
import Orders from'./components/Orders';
import Revenue from'./components/Revenue';
import './App.css';

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
