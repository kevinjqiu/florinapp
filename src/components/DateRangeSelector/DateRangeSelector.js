import React, { Component } from "react";
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import moment from "moment";
import DateRange from "../../models/DateRange";
import { connect } from "react-redux";
import * as actions from "../../actions";
import {
  thisMonth,
  lastMonth,
  twoMonthsAgo,
  threeMonthsAgo,
  thisYear
} from "../../models/presetDateRanges";

class DateSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onDateRangeClicked(dateRange) {
    this.props.changeDateRange(dateRange);
  }

  render() {
    const now = moment.utc();
    const { dateRange } = this.props;
    const dateRanges = [
      thisMonth(now),
      lastMonth(now),
      twoMonthsAgo(now),
      threeMonthsAgo(now),
      thisYear(now)
    ];
    return (
      <span>
        <Dropdown
          nav
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle.bind(this)}
        >
          <DropdownToggle>{dateRange.normalizedDisplay}</DropdownToggle>
          <DropdownMenu right>
            {dateRanges.map(dr => {
              return (
                <DropdownItem onClick={() => this.onDateRangeClicked(dr)}>
                  {dr.display}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>
      </span>
    );
  }
}

const mapStateToProps = ({ globals }) => {
  const { dateRange } = globals;
  return {
    dateRange
  };
};

export default connect(mapStateToProps, actions)(DateSelector);
