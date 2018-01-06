import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, ButtonGroup, Collapse, Row, Col } from "reactstrap";
import Currency from "../../components/Currency/Currency";
import Date from "../../components/Date/Date";
import ListActionButton from "../../components/ListActionButton/ListActionButton";
import DeleteButton from "../../components/ListActionButton/DeleteButton";
import { categoryTypes } from "../../models/CategoryType";
import { DropdownList } from "react-widgets";
import InputField from "../../components/InputField/InputField";
import { reduxForm, Field } from "redux-form";

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
        groupBy="type"
      />
    );
  }
}

// class LinkedTransactionSelector extends Component {
//   render() {
//     const { categories, disabled, value, onChange } = this.props;
//     return (
//       <DropdownList
//         data={categories}
//         filter="contains"
//         textField="name"
//         valueField="_id"
//         itemComponent={CategoryItemComponent}
//         disabled={disabled}
//         onChange={onChange}
//         value={value}
//         groupBy="type"
//       />
//     );
//   }
// }

const _TransactionDetailForm = ({ transaction }) => {
  return (
    <Container fluid style={{ backgroundColor: "e0e1e2", height: "100px" }}>
      <Row>
        <Col xs="9" lg="9">
          <form className="form-horizontal">
            <Field
              name="linkedTransaction"
              label="Linked Transaction"
              component={InputField}
            />
          </form>
        </Col>
      </Row>
    </Container>
  );
};

const TransactionDetailForm = ({ transaction }) => {
  const F = reduxForm({ form: `txnForm${transaction._id}` })(
    _TransactionDetailForm
  );
  return <F transaction={transaction} />;
};

export default class TransactionRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
  }
  render() {
    const {
      transaction,
      categories,
      disabledCategories,
      updateTransactionCategory
    } = this.props;
    const { isExpanded } = this.state;
    return (
      <tbody>
        <tr>
          <td>
            <ButtonGroup>
              <ListActionButton
                id={`btn-expand-${transaction._id}`}
                color="primary"
                icon={this.state.isExpanded ? "fa-angle-double-up" : "fa-angle-double-down"}
                tooltip="Expand"
                onClick={() => {
                  this.setState({
                    isExpanded: !isExpanded
                  });
                }}
              />
              <DeleteButton
                objectId={transaction._id}
                onClick={() => {
                  console.log("TODO");
                }}
              />
            </ButtonGroup>
          </td>
          <td>
            <Date date={transaction.date} />
          </td>
          <td>
            <Link to={`/accounts/${transaction.account._id}/view`}>
              {transaction.account.name}
            </Link>
          </td>
          <td>{transaction.name}</td>
          <td>{transaction.memo}</td>
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
              onChange={c => updateTransactionCategory(transaction._id, c._id)}
            />
          </td>
        </tr>
        <tr>
          <td colSpan="7" style={{ padding: 0, marginTop: 0, border: 0 }}>
            <Collapse isOpen={isExpanded}>
              <TransactionDetailForm transaction={transaction} />
            </Collapse>
          </td>
        </tr>
      </tbody>
    );
  }
}
