import React, { Component } from "react";
import { Nav } from "reactstrap";
import { SidebarNavLink, SidebarNavDropdown, Divider } from "./SidebarNav";
import SidebarMinimizer from "./SidebarMinimizer";
import TransactionsNavLink from "./TransactionsNavLink";

class Sidebar extends Component {
  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle("open");
  }

  render() {
    const {location} = this.props;

    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <Nav>
            <SidebarNavLink name="Dashboard" url="/dashboard" icon="icon-grid" />
            <SidebarNavLink name="Accounts" url="/accounts" icon="icon-wallet" />
            <TransactionsNavLink />
            {/* <SidebarNavLink name="Budgets" url="/budgets" icon="icon-calculator" /> */}
            <Divider />
            <SidebarNavDropdown name="Settings" url="/settings" icon="icon-options" location={location} onClick={(e) => this.handleClick(e)}>
              <SidebarNavLink name="General" url="/settings/general" icon="icon-settings" />
              <SidebarNavLink name="Categories" url="/settings/categories" icon="icon-pie-chart" />
              {/* <_SidebarNavLink name="Tags" url="/settings/tags" icon="icon-tags" /> */}
              <SidebarNavLink name="Sync" url="/settings/sync" icon="icon-refresh" />
            </SidebarNavDropdown>
          </Nav>
        </nav>
        <SidebarMinimizer />
      </div>
    );
  }
}

export default Sidebar;
