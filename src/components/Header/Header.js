import React, { Component } from "react";
import {
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  Badge
} from "reactstrap";
import DateRangeSelector from "../DateRangeSelector/DateRangeSelector";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";

class Header extends Component {
  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle("sidebar-hidden");
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle("sidebar-minimized");
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle("sidebar-mobile-show");
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle("aside-menu-hidden");
  }

  render() {
    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          <span className="navbar-toggler-icon" />
        </NavbarToggler>
        <NavbarBrand href="#" />
        <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>
          <span className="navbar-toggler-icon" />
        </NavbarToggler>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <DateRangeSelector />
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#">
              <i className="icon-bell" />
              <Badge pill color="danger">
              </Badge>
            </NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavbarToggler className="d-md-down-none" onClick={this.asideToggle}>
              <i className="navbar-toggler-icon" />
              {this.props.asideType ?
              <Badge pill color="warning" style={{position: "absolute", top: "50%", left: "50%"}}><i className="icon-eye"/>
              </Badge>
              : <span />}
            </NavbarToggler>
          </NavItem>
        </Nav>
        <ReactTooltip id="tt-toggle-sidebar" type="info" effect="solid" place="bottom">Contextual Sidebar</ReactTooltip>
      </header>
    );
  }
}

const mapStateToProps = ({ aside }) => {
  const { asideType } = aside;
  return { asideType };
};
export default connect(mapStateToProps, null)(Header);
