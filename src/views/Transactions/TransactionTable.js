import React, { Component } from "react";
import { Table } from "reactstrap";
import Currency from "../../components/Currency/Currency";

const Transaction = ({ transaction }) => {
  return (
    <tr>
      <td>{transaction.date}</td>
      <td>{transaction.account.name}</td>
      <td>{transaction.memo}</td>
      <td><Currency amount={transaction.amount} code={transaction.account.currency} /></td>
      <td>{transaction.categoryId}</td>
      <td />
    </tr>
  );
};

class TransactionTable extends Component {
  render() {
    const { transactions } = this.props;

    if (transactions.length === 0) {
      return <h2>No transactions. Upload some.</h2>;
    }

    return (
      <Table responsive striped>
        <thead>
          <tr>
            <th>Date</th>
            <th>Account</th>
            <th>Memo</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{transactions.map(t => <Transaction key={t._id} transaction={t} />)}</tbody>
      </Table>
    );
  }
}

export default TransactionTable;
