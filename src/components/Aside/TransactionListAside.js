import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import Currency from "../../components/Currency/Currency";
import { Section, Callout } from "./Section";
import CategorySummary from "./CategorySummary";

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
