import React, { Component } from 'react';
import * as moment from 'moment';
import '../App.css';
var api = require('../utils/moltin.js')


class Revenue extends Component {

  constructor(props) {
    super();
    this.state = {orders: null};
  }

  componentDidMount() {
    api.GetOrders()
    .then((orders) => {
      this.setState(() => {
        return {
          orders: orders
        }
      })
    })

    .catch((error) => {
      console.log(error)
    })

  }

  render() {

    var revenue = 0

    if(this.state.orders !== null) {

      var SevenDaysAgo = moment().subtract(7, 'days').format('YYYY-MM-DD');

      var OrdersLessThanSevenDaysAgo = this.state.orders.data.filter(function(order) {
        return order.meta.timestamps.created_at.slice(0,10) > SevenDaysAgo;
      })

      var RevenueLessThanSevenDaysAgo = OrdersLessThanSevenDaysAgo.forEach(function(order) {
        revenue = revenue + order.meta.display_price.with_tax.amount/100
      })

    };

    return (
      <p style={{'texAlign': 'center'}}>revenue last seven days: ${revenue}</p>
    )
  }
}

  export default Revenue;
