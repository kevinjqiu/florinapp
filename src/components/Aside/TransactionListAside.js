import React, { Component } from "react";
import { Progress } from "reactstrap";
import { connect } from "react-redux";
import * as actions from "../../actions";
import Currency from "../../components/Currency/Currency";

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

class TransactionListAside extends Component {
  render() {
    const { filters, transactionListAside, fetchIncomeExpensesStats } = this.props;
    const { incomeExpensesStats } = transactionListAside;
    return (
      <div>
        <Section onClick={() => {fetchIncomeExpensesStats(filters)}}>Income vs Expense</Section>
        <Callout
          textLeft="Income"
          color="info"
          textRight={incomeExpensesStats ? <Currency amount={incomeExpensesStats.CREDIT} code="CAD" /> : "N/A"}
        />
        <Callout
          textLeft="Expenses"
          color="danger"
          textRight={incomeExpensesStats ? <Currency amount={incomeExpensesStats.DEBIT} code="CAD" /> : "N/A"}
        />
        <Section>Income by Category</Section>
        <CallhoutBar
          text="Salary"
          percentage="94"
          colorTitle="info"
          coloBar="success"
        />
        <Section>Expenses by Category</Section>
        <CallhoutBar
          text="Mortgage"
          percentage="85"
          colorTitle="danger"
          colorBar="danger"
        />"
      </div>
    );
  }
}

const mapStateToProps = ({ transactions, transactionListAside }) => {
  const { fetchOptions } = transactions;
  return { filters: fetchOptions.filters, transactionListAside };
};

export default connect(mapStateToProps, actions)(TransactionListAside);
