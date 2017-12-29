import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Alert } from "reactstrap";
import Currency from "../../components/Currency/Currency";
import Date from "../../components/Date/Date";

import { DropdownList } from "react-widgets";
import { categoryTypes } from "../../models/CategoryType";
import { connect } from "react-redux";
import * as actions from "../../actions";

const CategoryItemComponent = ({ item }) => {
  let color;
  switch (item.type) {
    case categoryTypes.EXPENSE:
      color = "red";
      break;

    case categoryTypes.INCOME:
      color = "green";
      break;

    case categoryTypes.TRANSFER:
      color = "blue";
      break;

    default:
      color = "black";
  }
  return <span style={{ color }}>{item.name}</span>;
};

class CategorySelector extends Component {
  render() {
    const { categories, disabled, value, onChange } = this.props;
    return (
      <DropdownList
        data={categories}
        filter="contains"
        textField="name"
        valueField="_id"
        itemComponent={CategoryItemComponent}
        disabled={disabled}
        onChange={onChange}
        value={value}
      />
    );
  }
}

const Transaction = ({ transaction, categories, disabledCategories, updateTransactionCategory }) => {
  return (
    <tr>
      <td>
        <Date date={transaction.date} />
      </td>
      <td>
        <Link to={`/accounts/${transaction.account._id}/view`}>
          {transaction.account.name}
        </Link>
      </td>
      <td>{transaction.name}</td>
      <td style={{ textAlign: "right" }}>
        <Currency
          amount={transaction.amount}
          code={transaction.account.currency}
        />
      </td>
      <td>
        <CategorySelector
          categories={categories}
          value={transaction.categoryId}
          disabled={disabledCategories}
          onChange={(c) => updateTransactionCategory(transaction._id, c._id) }
        />
      </td>
      <td />
    </tr>
  );
};

class TransactionTable extends Component {
  render() {
    const { transactionsState, categoriesState, updateTransactionCategory } = this.props;
    const { loading, failed, transactions } = transactionsState;
    const { categories } = categoriesState;

    if (loading) {
      return (
        <i
          className="fa fa-spinner fa-spin fa-3x fa-fw"
          style={{ fontSize: "8em" }}
        />
      );
    }

    if (failed) {
      return (
        <Alert color="danger">
          Loading transactions failed. Try again later...
        </Alert>
      );
    }

    if (transactions.length === 0 && !loading) {
      return <h2>No transactions. Upload some.</h2>;
    }

    const disabledCategories = categories
      .filter(c => !c.allowTransactions)
      .map(c => c._id);

    return (
      <Table responsive striped>
        <thead>
          <tr>
            <th width="10%">Date</th>
            <th width="15%">Account</th>
            <th width="30%">Name</th>
            <th width="10%" style={{ textAlign: "right" }}>
              Amount
            </th>
            <th width="20%">Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <Transaction
              key={t._id}
              transaction={t}
              categories={categories}
              disabledCategories={disabledCategories}
              updateTransactionCategory={updateTransactionCategory}
            />
          ))}
        </tbody>
      </Table>
    );
  }
}

export default connect(null, actions)(TransactionTable);
