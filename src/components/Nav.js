import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import Orders from './Orders';
import Revenue from './Revenue';
import BestSellers from './BestSellers';
import TimeNav from './TimeNav';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class Nav extends Component {

  render() {
    return (
      <Router>
        <div>
          <Menu>
              <Icon name='dashboard' size='large' style={{paddingTop: 9, paddingLeft: 5}}/>
            <Menu.Item as={Link} to='/'>
              Orders
            </Menu.Item>
            <Menu.Item as={Link} to='/revenue'>
              Revenue
            </Menu.Item>
            <Menu.Item as={Link} to='/best-sellers'>
              Best Sellers
            </Menu.Item>
            <TimeNav />
          </Menu>


          <Route exact path="/" component={Orders}/>
          <Route path="/revenue" component={Revenue}/>
          <Route path="/best-sellers" component={BestSellers}/>

        </div>
      </Router>
    )
  }
};

export default Nav;
