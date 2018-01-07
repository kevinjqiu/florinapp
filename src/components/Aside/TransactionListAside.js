import React, { Component } from "react";
import { Progress } from "reactstrap";

const Section = ({ children }) => {
  return (
    <div>
      <div className="callout m-0 py-2 text-muted text-center bg-light text-uppercase">
        <small>{children}</small>
      </div>
      <hr className="transparent mx-3 my-0" />
    </div>
  );
};

const Callout = ({ color, textLeft, textRight }) => {
  return (
    <div>
      <div className={`callout callout-${color}`}>
        <small className="text-muted">{textLeft}</small>
        <br />
        <strong className="h4">{textRight}</strong>
      </div>
    </div>
  );
};

const CallhoutBar = ({ text, percentage, colorTitle, colorBar }) => {
  return (
    <div className={`callout callout-${colorTitle}`}>
      <ul className="horizontal-bars">
        <li>
          <div className="title">{text}</div>
          <div className="bars">
            <Progress
              className="progress-xs"
              color={colorBar}
              value={percentage}
            />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default class TransactionListAside extends Component {
  render() {
    return (
      <div>
        <Section>Income vs Expense</Section>
        <Callout textLeft="Income" color="info" textRight="$6738.45" />
        <Callout textLeft="Expenses" color="danger" textRight="$4318.45" />
        <Section>Income by Category</Section>
        <CallhoutBar text="Salary" percentage="94" colorTitle="info" coloBar="success" />
        <Section>Expenses by Category</Section>
        <CallhoutBar text="Mortgage" percentage="85" colorTitle="danger" colorBar="danger" />"
      </div>
    );
  }
}
