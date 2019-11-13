import React, { Component } from "react";
import Axios from "axios";
const ReactHighcharts = require("react-highcharts");

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartPoints: [],
      loading: true,
      category: "(Click on a point)",
      y: "(Click on a point)"
    };
  }
  componentDidMount() {
    Axios.get("http://localhost:5000/api/v1/userdata")
      .then(response => {
        this.setState({ chartPoints: response.data, loading: false });
      })
      .catch(err => console.log(err));
  }

  clickChartEvent = e => {
    console.log(e.point.category);
    console.log(e.point.y);
    this.setState({ category: e.point.category, y: e.point.y });
  };

  render() {
    if (this.state.loading === false) {
      console.log(this.state.chartPoints[0].datapoints.map(elem => elem[0]));
      console.log(this.state.chartPoints[0].datapoints.map(elem => elem[1]));
    }
    const config = {
      rangeSelector: {
        selected: 1
      },

      title: {
        text: "Data Points"
      },

      series: [
        {
          name: "Data Points",
          chart: {
            type: "line",
            zoomType: "y"
          },
          min: 0,
          data:
            this.state.loading === false
              ? this.state.chartPoints[0].datapoints
              : null,
          tooltip: {
            valueDecimals: 2
          },
          point: {
            events: {
              click: e => {
                this.clickChartEvent(e);
              }
            }
          }
        }
      ]
    };
    return (
      this.state.loading === false && (
        <div>
          <div>
            <ReactHighcharts config={config}></ReactHighcharts>
          </div>
          <h5> Data Points </h5>
          <p>Category: {this.state.category}</p>
          <p>Y: {this.state.y}</p>
        </div>
      )
    );
  }
}

export default Chart;
