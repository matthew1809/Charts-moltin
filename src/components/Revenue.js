import React, { Component } from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import '../App.css';
import Center from 'react-center';
import { Statistic, Card, Icon } from 'semantic-ui-react'
import * as Spinner from 'react-spinkit';
import { Grid, Row, Col } from 'react-bootstrap';
import {percentDiff} from 'percentage-difference';
var format = require('format-number');

const mapStateToProps = state => {
  return {
    orders: state.orders
  }
}

class Revenue extends Component {

  constructor(props) {
    super();
  }

  render() {

    var revenue24h = 0;
    var revenue7 = 0;
    var revenue14 = 0;
    var orderData = this.props.orders.orders;

    if(orderData !== null) {
      console.log(this.props)
      var past = (num, frame) => {
        return moment().subtract(num, frame).format('YYYY-MM-DD');
      };

      // var OrdersLessThanX = (oldNum, oldFrame, newNum, newFrame) => {
      //   this.state.orders.data.filter(function(order) {
      //     return order.meta.timestamps.created_at.slice(0,10) > past(oldNum, oldFrame) && order.meta.timestamps.created_at.slice(0,10) < past(newNum, newFrame);
      //   })
      // }

      var OrdersLessThanTwentyFourHoursAgo = orderData.data.filter(function(order) {
        return order.meta.timestamps.created_at.slice(0,10) > past(24, 'hours');
      });

      OrdersLessThanTwentyFourHoursAgo.forEach(function(order) {
        revenue24h = revenue24h + order.meta.display_price.with_tax.amount/100
      });

      var OrdersLessThanSevenDaysAgo = orderData.data.filter(function(order) {
        return order.meta.timestamps.created_at.slice(0,10) > past(7, 'days');
      });

      OrdersLessThanSevenDaysAgo.forEach(function(order) {
        revenue7 = revenue7 + order.meta.display_price.with_tax.amount/100
      });

      var OrdersLessThanFourteenDaysAgo = orderData.data.filter(function(order) {
        return order.meta.timestamps.created_at.slice(0,10) > past(14, 'days') && order.meta.timestamps.created_at.slice(0,10) < past(7, 'days');
      });

      OrdersLessThanFourteenDaysAgo.forEach(function(order) {
        revenue14 = revenue14 + order.meta.display_price.with_tax.amount/100
      });

      // var round_rev24h =  Math.round(revenue24h);
      // var formatted_rev24h = format({prefix: '$'})(round_rev24h);

      var round_rev7 =  Math.round(revenue7);
      var formatted_rev7 = format({prefix: '$'})(round_rev7);

      var round_rev14 = Math.round(revenue14);
      var formatted_rev14 = format({prefix: '$'})(round_rev14);

      var diff = percentDiff(round_rev14, round_rev7, true);

      //  console.log(round_rev24h)
      //  console.log(round_revTwoMonths)

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
                    <Icon name='percent' size='large'/>
                    </div>
                    <Statistic value={diff} color='violet' label='Difference' style={{paddingBottom: 5}}/>
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

  export default connect(mapStateToProps)(Revenue);
