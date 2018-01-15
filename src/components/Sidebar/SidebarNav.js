import React  from "react";
import { NavLink } from "react-router-dom";
import { NavItem } from "reactstrap";

const activeRoute = (routeName, location) => {
  return location.pathname.indexOf(routeName) > -1
    ? "nav-item nav-dropdown open"
    : "nav-item nav-dropdown";
}

export const Divider = () => {
  return <li className={"divider"} />;
};

export const SidebarNavLink = ({url, icon, name, children, ...opts}) => {
  url = url || "";
  return (
    <NavItem>
      <NavLink to={url} className="nav-link" activeClassName="active" {...opts}>
        <i className={icon} />
        {name}{children}
      </NavLink>
    </NavItem>
  );
}

export const SidebarNavDropdown = ({ url, name, children, icon, onClick, location }) => {
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
