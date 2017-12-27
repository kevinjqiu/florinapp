import React, { Component } from "react";
import { Table } from "reactstrap";
import Currency from "../../components/Currency/Currency";

const Transaction = ({ transaction }) => {
  return (
    <tr>
      <td>{transaction.date}</td>
      <td />
      <td>{transaction.info}</td>
      <td>{transaction.memo}</td>
      <td><Currency amount={transaction.amount} code={"CAD"} /></td>
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
      <Table response>
        <thead>
          <tr>
            <th>Date</th>
            <th>Account</th>
            <th>Info</th>
            <th>Memo</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{transactions.map(t => <Transaction transaction={t} />)}</tbody>
      </Table>
    );
  }
}

export default TransactionTable;
