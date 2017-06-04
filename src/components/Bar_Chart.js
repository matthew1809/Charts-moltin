import React, { Component } from 'react';
var BarChart = require("react-chartjs").Bar;

class Bar extends Component {

  render() {
    return (
      <div>
        <BarChart data={this.props.chartData} options={this.props.chartOptions} width="400" height="300"/>
      </div>
    )
  }
};

export default Bar;
