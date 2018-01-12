import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";
import { SidebarNavLink } from "./SidebarNav";
import ReactTooltip from "react-tooltip";

const TransactionsNavLink = () => {
  return (
    <SidebarNavLink
      name="Transactions"
      url="/transactions"
      icon="icon-book-open"
    >
      <Link to="#">
        <Badge
          color="success"
          pill
          data-tip
          data-for="tooltip-transactions-sidebar-badge"
        >
          1
        </Badge>
      </Link>
      <ReactTooltip id="tooltip-transactions-sidebar-badge">
        Number of uncategorized transactions in the current date range
      </ReactTooltip>
    </SidebarNavLink>
  );
};

export default TransactionsNavLink;
