import React, { Component } from 'react';
var BarChart = require("react-chartjs").Bar;


class Bar_Chart extends Component {

  render() {
    return (
      <div>
      <p>Orders over time</p>
        <BarChart data={this.props.chartData} options={this.props.chartOptions} width="500" height="500"/>
      </div>
    )
  }
};

export default Bar_Chart;
