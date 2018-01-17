// An adapter for Frappe charts to React
// Credit: https://github.com/frappe/charts/issues/24
import React, { Component } from "react";
import Frappe from "frappe-charts/dist/frappe-charts.esm";

import "frappe-charts/dist/frappe-charts.min.css";

class FrappeChart extends Component {
  componentDidMount() {
    const {
      title,
      data,
      type = "bar",
      height = 250,
      onSelect,
      ...rest
    } = this.props;
    this.c = new Frappe({
      parent: this.chart,
      title,
      data,
      type,
      height,
      is_navigable: !!onSelect,
      ...rest
    });
    if (onSelect) {
      this.c.parent.addEventListener("data-select", onSelect);
    }
  }

  componentWillReceiveProps(props) {
    console.log(this.c);
    if (this.c.update_values) {
      this.c.update_values(props.data.datasets, props.data.labels);
    }
  }

  render() {
    return <div ref={chart => (this.chart = chart)} />;
  }
}

export default FrappeChart;
