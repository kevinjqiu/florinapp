import React, { Component } from "react";
import { Progress } from "reactstrap";
import { connect } from "react-redux";
import * as actions from "../../actions";
import Currency from "../../components/Currency/Currency";
import ReactTooltip from "react-tooltip";
import * as currencyFormatter from "currency-formatter";

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

const CallhoutBar = ({
  id,
  text,
  percentage,
  colorTitle,
  colorBar,
  amount
}) => {
  const tooltipId = `tooltip-${id}`;
  return (
    <div className={`callout callout-${colorTitle}`} style={{ border: "0px" }}>
      <ul className="horizontal-bars" data-tip data-for={tooltipId}>
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
      <ReactTooltip place="top" id={tooltipId} type="info" effect="solid">
        {currencyFormatter.format(amount, { code: "CAD" })}
      </ReactTooltip>
    </div>
  );
};

const CategorySummary = ({
  categorySummary,
  type,
  title,
  colorTitle,
  colorBar
}) => {
  if (!categorySummary) {
    return (
      <div>
        <Section>{title}</Section>
        <span>N/A</span>
      </div>
    );
  }

  const totalAmount = categorySummary
    .map(s => s.amount)
    .reduce((a, b) => a + b, 0);

  return (
    <div>
      <Section>{title}</Section>
      {categorySummary.map((s, idx) => {
        return (
          <CallhoutBar
            key={`${type}-${idx}`}
            id={`${type}-${idx}`}
            text={s.categoryName}
            percentage={String(100 * s.amount / totalAmount)}
            colorTitle={colorTitle}
            colorBar={colorBar}
            amount={s.amount}
          />
        );
      })}
    </div>
  );
};

class TransactionListAside extends Component {
  render() {
    const {
      filters,
      transactionListAside,
      fetchIncomeExpensesStats
    } = this.props;
    const { incomeExpensesStats, categorySummaries } = transactionListAside;
    return (
      <div>
        <Section
          onClick={() => {
            fetchIncomeExpensesStats(filters);
          }}
        >
          Income vs Expense
        </Section>
        <Callout
          textLeft="Income"
          color="success"
          textRight={
            incomeExpensesStats ? (
              <Currency amount={incomeExpensesStats.CREDIT} code="CAD" />
            ) : (
              "N/A"
            )
          }
        />
        <Callout
          textLeft="Expenses"
          color="danger"
          textRight={
            incomeExpensesStats ? (
              <Currency amount={incomeExpensesStats.DEBIT} code="CAD" />
            ) : (
              "N/A"
            )
          }
        />
        <CategorySummary
          categorySummary={
            categorySummaries ? categorySummaries.incomeCategories : null
          }
          title="Income By Category"
          colorTitle="success"
          colorBar="success"
          type="income"
        />
        <CategorySummary
          categorySummary={
            categorySummaries ? categorySummaries.expensesCategories : null
          }
          title="Expenses By Category"
          colorTitle="danger"
          colorBar="danger"
          type="expenses"
        />
      </div>
    );
  }
}

const mapStateToProps = ({ transactions, transactionListAside }) => {
  const { fetchOptions } = transactions;
  return { filters: fetchOptions.filters, transactionListAside };
};

export default connect(mapStateToProps, actions)(TransactionListAside);
