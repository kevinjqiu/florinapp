import React, { Component } from "react";
import { Table, Alert } from "reactstrap";
import TransactionsPagination from "./TransactionsPagination";
import { connect } from "react-redux";
import * as actions from "../../actions";
import TransactionRow from "./TransactionRow";

class TransactionTable extends Component {
  render() {
    const {
      transactionsState,
      categoriesState,
      updateTransactionCategory
    } = this.props;
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
      return <h2>No transactions found for the specified criteria.</h2>;
    }

    const disabledCategories = categories
      .filter(c => !c.allowTransactions)
      .map(c => c._id);

    return (
      <div>
        <TransactionsPagination />
        <Table responsive>
          <thead>
            <tr>
              <th width="5%" />
              <th width="10%">Date</th>
              <th width="10%">Account</th>
              <th width="20%">Name</th>
              <th>Memo</th>
              <th width="10%" style={{ textAlign: "right" }}>
                Amount
              </th>
              <th width="20%">Category</th>
            </tr>
          </thead>
          {transactions.map(t => (
            <TransactionRow
              key={t._id}
              transaction={t}
              categories={categories}
              disabledCategories={disabledCategories}
              updateTransactionCategory={updateTransactionCategory}
            />
          ))}
          <tfoot>
            <tr>
              <td colSpan="7">
                <TransactionsPagination />
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
    );
  }
}

export default connect(null, actions)(TransactionTable);
