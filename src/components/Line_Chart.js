import React, { Component } from 'react';
var LineChart = require("react-chartjs").Line;

class Line extends Component {

  render() {
    return (
      <div>
        <LineChart data={this.props.chartData} options={this.props.chartOptions} width="400" height="300"/>
      </div>
    )
  }
};

export default Line;
