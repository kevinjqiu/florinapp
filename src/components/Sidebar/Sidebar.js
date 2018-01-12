import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Badge, Nav, NavItem } from "reactstrap";
import SidebarMinimizer from "./SidebarMinimizer";

const activeRoute = (routeName, location) => {
  return location.pathname.indexOf(routeName) > -1
    ? "nav-item nav-dropdown open"
    : "nav-item nav-dropdown";
}

const Divider = () => {
  return <li className={"divider"} />;
};

const SidebarNavLink = ({url, icon, name}) => {
  url = url || "";
  return (
    <NavItem>
      <NavLink to={url} className="nav-link" activeClassName="active">
        <i className={icon} />
        {name}
      </NavLink>
    </NavItem>
  );
}

const SidebarNavDropdown = ({ url, name, children, icon, onClick, location }) => {
  return (
    <li className={activeRoute(url, location)}>
      <a className="nav-link nav-dropdown-toggle" href="#" onClick={onClick}>
        <i className={icon} />
        {name}
      </a>
      <ul className="nav-dropdown-items">{children}</ul>
    </li>
  );
};

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
            <SidebarNavLink name="Transactions" url="/transactions" icon="icon-book-open" />
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
