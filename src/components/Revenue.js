import React, { Component } from 'react';
import * as moment from 'moment';
import '../App.css';
import Center from 'react-center';
import { Statistic, Card, Icon } from 'semantic-ui-react'
import * as Spinner from 'react-spinkit';
import { Grid, Row, Col } from 'react-bootstrap';
import {percentDiff} from 'percentage-difference';
var api = require('../utils/moltin.js')
var format = require('format-number');

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

    var revenue7 = 0
    var revenue14 = 0

    if(this.state.orders !== null) {

      var SevenDaysAgo = moment().subtract(7, 'days').format('YYYY-MM-DD');
      var OrdersLessThanSevenDaysAgo = this.state.orders.data.filter(function(order) {
        return order.meta.timestamps.created_at.slice(0,10) > SevenDaysAgo;
      })
      OrdersLessThanSevenDaysAgo.forEach(function(order) {
        revenue7 = revenue7 + order.meta.display_price.with_tax.amount/100
      })

      var FourteenDaysAgo = moment().subtract(14, 'days').format('YYYY-MM-DD');
      var OrdersLessThanFourteenDaysAgo = this.state.orders.data.filter(function(order) {
        return order.meta.timestamps.created_at.slice(0,10) > FourteenDaysAgo && order.meta.timestamps.created_at.slice(0,10) < SevenDaysAgo;
      })
      OrdersLessThanFourteenDaysAgo.forEach(function(order) {
        revenue14 = revenue14 + order.meta.display_price.with_tax.amount/100
      })

      var round_rev7 =  Math.round(revenue7)
      var formatted_rev7 = format({prefix: '$'})(round_rev7);
      var round_rev14 = Math.round(revenue14)
      var formatted_rev14 = format({prefix: '$'})(round_rev14);
      var diff = percentDiff(round_rev14, round_rev7, true)
      // console.log(round_rev7)
      // console.log(round_rev14)
      // console.log(diff)

      return (
        <div style={{paddingTop: 50, width: 100 + '%', height: 100 + '%'}}>
          <Grid fluid>
              <Row className="show-grid">
                <Col xs={4}>
                  <Center>
                    <Card>
                      <div style={{textAlign: 'center', paddingTop: 5}}>
                      <Icon name='trophy' size='large'/>
                      </div>
                      <Statistic value={formatted_rev7} color='teal' label='Revenue last seven days' style={{paddingBottom: 5}}/>
                    </Card>
                  </Center>
                </Col>

                <Col xs={4}>
                  <Center>
                    <Card>
                      <div style={{textAlign: 'center', paddingTop: 5}}>
                      <Icon name='trophy' size='large'/>
                      </div>
                      <Statistic value={formatted_rev14} color='blue' label='Revenue previous seven days' style={{paddingBottom: 5}}/>
                    </Card>
                  </Center>
                </Col>
                <Col xs={4}>
                <Center>
                  <Card>
                    <div style={{textAlign: 'center', paddingTop: 5}}>
                    <Icon name='percent icon' size='large'/>
                    </div>
                    <Statistic value={diff} color='violet' label='% difference' style={{paddingBottom: 5}}/>
                  </Card>
                </Center>
              </Col>
            </Row>
          </Grid>
        </div>
      )
    }

    else {
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

  export default Revenue;
