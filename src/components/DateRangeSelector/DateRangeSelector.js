import React, { Component } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row
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
import { DateTimePicker } from "react-widgets";
import momentLocalizer from "react-widgets-moment";

class CustomDateSelectorModal extends Component {
  constructor(props) {
    super(props);
    moment.locale("en");
    momentLocalizer();
  }

  render() {
    const { isOpen, onApply, onClose, error } = this.props;
    return (
      <Modal isOpen={isOpen}>
        <ModalHeader>Custom Date</ModalHeader>
        <ModalBody>
          { error ? <Alert color="danger">{error}</Alert> : "" }
          <Row>
            <Col lg="3">From:</Col>
            <Col lg="12">
              <DateTimePicker onChange={(c) => {this.dateFrom = c}} date={true} time={false} />
            </Col>
          </Row>
          <Row>
            <Col lg="3">To:</Col>
            <Col lg="12">
              <DateTimePicker onChange={(c) => {this.dateTo = c}} date={true} time={false} />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button name="apply" color="success" onClick={() => onApply(this.dateFrom, this.dateTo)}>
              Apply
            </Button>
            <Button name="close" color="danger" onClick={onClose}>
              Close
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </Modal>
    );
  }
}

class DateSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      modalOpen: false,
      datePickerError: null
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

    const onApply = (dateFrom, dateTo) => {
      if (!dateFrom || !dateTo) {
        this.setState({
          datePickerError: "Must pick both start and end date"
        });
        return;
      }
      if (dateFrom > dateTo) {
        this.setState({
          datePickerError: "Start date must be before the end date"
        });
        return;
      }

      const dateRange = new DateRange({
        start: moment(dateFrom),
        end: moment(moment(dateTo) + moment.duration(1, "days")),
      })

      this.props.changeDateRange(dateRange);

      this.setState({
        modalOpen: false
      })
    };
    const onClose = () => {
      this.setState({ modalOpen: false });
    };
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
                <DropdownItem key={dr.display} onClick={() => this.onDateRangeClicked(dr)}>
                  {dr.display}
                </DropdownItem>
              );
            })}
            <DropdownItem onClick={() => this.setState({ modalOpen: true, datePickerError: null })}>
              Custom...
              <CustomDateSelectorModal
                isOpen={this.state.modalOpen}
                onApply={onApply}
                onClose={onClose}
                error={this.state.datePickerError}
              />
            </DropdownItem>
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
