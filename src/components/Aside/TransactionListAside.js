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

const IncomeByCategory = ({ categorySummary }) => {
  if (!categorySummary) {
    return (
      <div>
        <Section>Income by Category</Section>
        <span>N/A</span>
      </div>
    );
  }

  const totalAmount = categorySummary.map(s => s.amount).reduce((a, b) => a + b);

  return (
    <div>
      <Section>Income by Category</Section>
      {categorySummary.map(s => {
        return (
        <CallhoutBar
          text={s.categoryName}
          percentage={String(100 * s.amount / totalAmount)}
          colorTitle="success"
          colorBar="success"
        />
        );
      })}
    </div>
  );
};

const ExpensesByCategory = ({ categorySummary }) => {
  console.log(categorySummary);
  if (!categorySummary) {
    return (
      <div>
        <Section>Expenses by Category</Section>
        <span>N/A</span>
      </div>
    );
  }

  const totalAmount = categorySummary.map(s => s.amount).reduce((a, b) => a + b);
  console.log(totalAmount);

  return (
    <div>
      <Section>Expenses by Category</Section>
      {categorySummary.map(s => {
        return (
        <CallhoutBar
          text={s.categoryName}
          percentage={String(100 * s.amount / totalAmount)}
          colorTitle="danger"
          colorBar="danger"
        />
        );
      })}
    </div>
  );
};

class TransactionListAside extends Component {
  render() {
    const { filters, transactionListAside, fetchIncomeExpensesStats } = this.props;
    const { incomeExpensesStats, categorySummaries } = transactionListAside;
    return (
      <div>
        <Section onClick={() => {fetchIncomeExpensesStats(filters)}}>Income vs Expense</Section>
        <Callout
          textLeft="Income"
          color="success"
          textRight={incomeExpensesStats ? <Currency amount={incomeExpensesStats.CREDIT} code="CAD" /> : "N/A"}
        />
        <Callout
          textLeft="Expenses"
          color="danger"
          textRight={incomeExpensesStats ? <Currency amount={incomeExpensesStats.DEBIT} code="CAD" /> : "N/A"}
        />
        <IncomeByCategory categorySummary={categorySummaries ? categorySummaries.incomeCategories: null} />
        <ExpensesByCategory categorySummary={categorySummaries ? categorySummaries.expensesCategories : null} />
      </div>
    );
  }
}

const mapStateToProps = ({ transactions, transactionListAside }) => {
  const { fetchOptions } = transactions;
  return { filters: fetchOptions.filters, transactionListAside };
};

export default connect(mapStateToProps, actions)(TransactionListAside);
