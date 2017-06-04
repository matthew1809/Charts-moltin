import React, { Component } from 'react';
import * as moment from 'moment';
import Line_Chart from './Line_Chart'
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
    //console.log(this.state.orders.data)

      var SevenDaysAgo = moment().subtract(7, 'days').calendar();
      var f = moment(SevenDaysAgo).format();
      var n = f.slice(8, 10)
      console.log(n);

      var OrdersLessThanSevenDaysAgo = this.state.orders.data.filter(function(order) {
        return order.meta.timestamps.created_at.slice(8,10) > n;
      })

      var RevenueLessThanSevenDaysAgo = OrdersLessThanSevenDaysAgo.forEach(function(order) {
        revenue = revenue + order.meta.display_price.with_tax.amount/100
      })

    };

    return (
      <p style={{'text-align': 'center'}}>revenue last seven days: ${revenue}</p>
    )
  }
}

  export default Revenue;
