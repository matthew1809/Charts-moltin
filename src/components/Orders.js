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
      //console.log(this.state.orders.data)

      var SevenDaysAgo = moment().subtract(7, 'days').calendar();
      var f = moment(SevenDaysAgo).format();
      var n = f.slice(8, 10)
      //console.log(n);
      var OrdersLessThanSevenDaysAgo = this.state.orders.data.filter(function(order) {
        return order.meta.timestamps.created_at.slice(8,10) > n;
      })
      console.log(OrdersLessThanSevenDaysAgo);

      var Today = moment().format();
      var TodaySliced = Today.slice(8,10)
      var OneDayAgo = moment().subtract(1, 'days');
      var OneDayAgoFormatted = moment(OneDayAgo).format();
      var OneDayAgoSliced = OneDayAgoFormatted.slice(8,10);
      var TwoDaysAgo = moment().subtract(2, 'days');
      var TwoDaysAgoFormatted = moment(TwoDaysAgo).format();
      var TwoDaysAgoSliced = TwoDaysAgoFormatted.slice(8,10);
      var ThreeDaysAgo = moment().subtract(3, 'days');
      var ThreeDaysAgoFormatted = moment(ThreeDaysAgo).format();
      var ThreeDaysAgoSliced = ThreeDaysAgoFormatted.slice(8,10);
      var FourDaysAgo = moment().subtract(4, 'days');
      var FiveDaysAgo = moment().subtract(5, 'days');
      var SixDaysAgo = moment().subtract(6, 'days');

      var Data = [0, 0, 0, 0, 0, 0, 0]
      var result = OrdersLessThanSevenDaysAgo.forEach(function(order) {
         console.log(order.meta.timestamps.created_at.slice(8,10))
        // console.log(TodaySliced);
        switch(order.meta.timestamps.created_at.slice(8,10)) {
          case TodaySliced : Data[6]++;
          // case OneDayAgoSliced : Data[5]++;
          // case TwoDaysAgoSliced : Data[4]++;
          // case ThreeDaysAgoSliced : Data[3]++;
          break;
        }

        //console.log(order.meta.timestamps.created_at.slice(5,7))
         //console.log(Data)
      });



      var chartData = {
            labels: [moment(SixDaysAgo).format("MMM Do YYYY"), moment(FiveDaysAgo).format("MMM Do YYYY"), moment(FourDaysAgo).format("MMM Do YYYY"), moment(ThreeDaysAgo).format("MMM Do YYYY"), moment(TwoDaysAgo).format("MMM Do YYYY"), moment(OneDayAgo).format("MMM Do YYYY"), moment(Today).calendar()],
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
      //console.log(this.state)

      return (
        <p>no data</p>
      )
    }
  }
}

export default Orders;
