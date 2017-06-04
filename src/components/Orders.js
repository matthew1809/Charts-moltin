import React, { Component } from 'react';
import * as moment from 'moment';
import Line_Chart from './Line_Chart'
import Bar_Chart from './Bar_Chart'
import '../App.css';
var api = require('../utils/moltin.js')

class Orders extends Component {

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

      if(this.state.orders !== null) {

      var Today = moment().format('YYYY-MM-DD');
      var OneDayAgo = moment().subtract(1, 'days').format('YYYY-MM-DD');
      var TwoDaysAgo = moment().subtract(2, 'days').format('YYYY-MM-DD');
      var ThreeDaysAgo = moment().subtract(3, 'days').format('YYYY-MM-DD');
      var FourDaysAgo = moment().subtract(4, 'days').format('YYYY-MM-DD');
      var FiveDaysAgo = moment().subtract(5, 'days').format('YYYY-MM-DD');
      var SixDaysAgo = moment().subtract(6, 'days').format('YYYY-MM-DD');
      var SevenDaysAgo = moment().subtract(7, 'days').format('YYYY-MM-DD');

      var OrdersLessThanSevenDaysAgo = this.state.orders.data.filter(function(order) {
        return order.meta.timestamps.created_at.slice(0,10) > SevenDaysAgo;
      })

      var Data = [0, 0, 0, 0, 0, 0, 0]

      var result = OrdersLessThanSevenDaysAgo.forEach(function(order) {
         //console.log(order.meta.timestamps.created_at.slice(0,10))

        switch(order.meta.timestamps.created_at.slice(0,10)) {
          case Today : Data[6]++;
          case OneDayAgo : Data[5]++;
          case TwoDaysAgo : Data[4]++;
          case ThreeDaysAgo : Data[3]++;
          case FourDaysAgo : Data[2]++;
          case FiveDaysAgo : Data[1]++;
          case SixDaysAgo : Data[0]++;
          break;
        }
        // console.log(Data)
      });

      var chartData = {
            labels: [moment(moment().subtract(6, 'days')).format("MMM Do YYYY"), moment(moment().subtract(5, 'days')).format("MMM Do YYYY"), moment(moment().subtract(4, 'days')).format("MMM Do YYYY"), moment(moment().subtract(3, 'days')).format("MMM Do YYYY"), moment(moment().subtract(2, 'days')).format("MMM Do YYYY"), moment(moment().subtract(1, 'days')).format("MMM Do YYYY"), moment().calendar()],
            datasets: [{
                label: '# of Orders',
                data: Data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
      }

      var chartOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
      };

      return (
        <div>
          <div style={{float : 'left', width: 50 + '%'}}>
            <Line_Chart chartData={chartData} chartOptions={chartOptions}/>
          </div>
          <div style={{float : 'right', width: 50 + '%'}}>
            <Bar_Chart chartData={chartData} chartOptions={chartOptions}/>
          </div>
        </div>
      )

      }

    else {
      console.log('no data')
      return (
        <p>no data</p>
      )
    }
  }
}

export default Orders;
