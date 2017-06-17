import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Orders from './Orders';
import Revenue from './Revenue';
import BestSellers from './BestSellers';
import TimeNav from './TimeNav';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
var api = require('../utils/moltin.js');

const mapStateToProps = state => {
  return {
    orders: state.orders
  }
}

class Nav extends Component {

  constructor(props) {
    super();
  }

  componentDidMount() {

    this.props.dispatch((dispatch) => {
        dispatch({type: "Fetch_Orders_Start"})

        api.GetOrders()

        .then((orders) => {
          dispatch({type: "Fetch_Orders_End", payload: orders})
        })
    })

  }

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

          <Route exact path="/" render={(props) => (
              <Orders {...props} />
          )}/>
          
          <Route path="/revenue" render={(props) => (
              <Revenue {...props} />
          )}/>
          <Route path="/best-sellers" component={BestSellers}/>

        </div>
      </Router>
    )
  }
};

export default connect(mapStateToProps)(Nav);
