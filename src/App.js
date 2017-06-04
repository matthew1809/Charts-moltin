import React, { Component } from 'react';
import Orders from'./components/Orders';
import Revenue from'./components/Revenue';
import BestSellers from './components/BestSellers';
import { Menu, Icon } from 'semantic-ui-react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

class App extends Component {
  render() {

    return (
      <Router>
    <div>
      <Menu>
          <Icon name='dashboard icon' size='large' style={{paddingTop: 9, paddingLeft: 5}}/>
        <Menu.Item as={Link} to='/'>
          Orders
        </Menu.Item>
        <Menu.Item as={Link} to='/revenue'>
          Revenue
        </Menu.Item>
        <Menu.Item as={Link} to='/best-sellers'>
          Best Sellers
        </Menu.Item>
      </Menu>


      <Route exact path="/" component={Orders}/>
      <Route path="/revenue" component={Revenue}/>
      <Route path="/best-sellers" component={BestSellers}/>

    </div>
  </Router>

    );
  }
}

export default App;
