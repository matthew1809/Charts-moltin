import React, { Component } from 'react';
var LineChart = require("react-chartjs").Line;


class Line_Chart extends Component {

  render() {
    return (
      <div>
      <p>Orders over time</p>
        <LineChart data={this.props.chartData} options={this.props.chartOptions} width="500" height="500"/>
      </div>
    )
  }
};

export default Line_Chart;
