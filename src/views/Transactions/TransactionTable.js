import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import Currency from "../../components/Currency/Currency";
import Date from "../../components/Date/Date";

const Transaction = ({ transaction }) => {
  return (
    <tr>
      <td><Date date={transaction.date} /></td>
      <td><Link to={`/accounts/${transaction.account._id}/view`}>{transaction.account.name}</Link></td>
      <td>{transaction.memo}</td>
      <td style={{textAlign: "right"}}><Currency amount={transaction.amount} code={transaction.account.currency} /></td>
      <td>{transaction.categoryId}</td>
      <td />
    </tr>
  );
};

class TransactionTable extends Component {
  render() {
    const { transactions, ui } = this.props;
    const { loading, failed } = ui;

    if (loading) {
      return <i className="fa fa-spinner fa-spin fa-3x fa-fw" style={{ fontSize: "8em" }} />;
    }

    if (transactions.length === 0 && !loading) {
      return <h2>No transactions. Upload some.</h2>;
    }

    return (
      <Table responsive striped>
        <thead>
          <tr>
            <th>Date</th>
            <th>Account</th>
            <th>Memo</th>
            <th style={{textAlign: "right"}}>Amount</th>
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
