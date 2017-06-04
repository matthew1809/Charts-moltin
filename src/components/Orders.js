import React, { Component } from 'react';
import * as moment from 'moment';
import Line from './Line_Chart'
import Bar from './Bar_Chart'
import '../App.css';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Center from 'react-center';
var Spinner = require('react-spinkit');
var api = require('../utils/moltin.js');

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

      var past = (days) => {
        return moment().subtract(days, 'days').format('YYYY-MM-DD');
      }
      var Today = moment().format('YYYY-MM-DD');

      var OrdersLessThanSevenDaysAgo = this.state.orders.data.filter(function(order) {
        return order.meta.timestamps.created_at.slice(0,10) > past(7);
      })

      var Data = [0, 0, 0, 0, 0, 0, 0]

      OrdersLessThanSevenDaysAgo.forEach(function(order) {

        switch(order.meta.timestamps.created_at.slice(0,10)) {
          case Today : Data[6]++;
          break;
          case past(1) : Data[5]++;
          break;
          case past(2) : Data[4]++;
          break;
          case past(3) : Data[3]++;
          break;
          case past(4) : Data[2]++;
          break;
          case past(5) : Data[1]++;
          break;
          case past(6) : Data[0]++;
          break;
          default : return;
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
      <MuiThemeProvider>
        <Tabs>
          <Tab label="Line Chart" >
              <div style={{float : 'left', width: 50 + '%'}}>
                <Line chartData={chartData} chartOptions={chartOptions}/>
              </div>
          </Tab>
          <Tab label="Bar Chart" >
            <div style={{float : 'right', width: 50 + '%'}}>
              <Bar chartData={chartData} chartOptions={chartOptions}/>
            </div>
          </Tab>
        </Tabs>
      </MuiThemeProvider>
      )

      }

    else {
      console.log('no data')
      return (
      <div style={{height: 100 + '%', width: 100 + '%'}}>
        <Center style={{paddingTop: 250}}>
          <Spinner name="ball-spin-fade-loader"/>
        </Center>
      </div>
      )
    }
  }
}

export default Orders;
