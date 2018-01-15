import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DropdownList } from "react-widgets";
import { categoryTypes } from "../../models/CategoryType";
import { connect } from "react-redux";
import * as links from "../../models/links";

let CategoryItemComponent = ({ categoriesIdMap, item }) => {
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
  if (item.parent) {
    const parent = categoriesIdMap[item.parent];
    console.log(categoriesIdMap);
    console.log(item.parent);
    return <span style={{ color }}>{parent.name}::{item.name}</span>;
  }
  return <span style={{ color }}><strong>{item.name}</strong></span>;
};

CategoryItemComponent = connect(({categories}) => {
  const { categoriesIdMap } = categories;
  return { categoriesIdMap };
}, null)(CategoryItemComponent);

let CategoryValueComponent = ({item, location}) => {
  if (item) {
    const newLink = links.createTransactionLink(location, (queryParams) => {
      return {
        ...queryParams,
        "filters.categoryId": item._id,
        page: 1
      }
    });
    return <Link to={newLink} onClick={(e)=>e.stopPropagation()}>{item.name}</Link>
  }
  return null;
}

const mapStateToProps = ({ router }) => {
  const { location } = router;
  return { location };
}

CategoryValueComponent = connect(mapStateToProps, null)(CategoryValueComponent);


export default class CategorySelector extends Component {
  render() {
    const { categories, disabled, value, onChange } = this.props;
    return (
      <DropdownList
        data={categories}
        filter="contains"
        textField="name"
        valueField="_id"
        itemComponent={CategoryItemComponent}
        valueComponent={CategoryValueComponent}
        disabled={disabled}
        onChange={onChange}
        value={value}
        groupBy="type"
      />
    );
  }
}