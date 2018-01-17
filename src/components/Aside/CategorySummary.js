import React, { Component } from "react";
import {
  TabPane,
  TabContent,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { LabelList, Cell, ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";
import { CalloutBar, Section } from "./Section";
import Currency from "../Currency/Currency";
import { PRESET_COLOR_MAP } from "../../common/const";

const CategorySummaryLineChartTab = ({ tabId, type, categorySummary, colorTitle, colorBar }) => {
  const totalAmount = categorySummary
    .map(s => s.amount)
    .reduce((a, b) => a + b, 0);

  return (
    <TabPane tabId={tabId}>
      {categorySummary.map((s, idx) => {
        return (
          <CalloutBar
            key={`${type}-${idx}`}
            id={`${type}-${idx}`}
            text={s.categoryName}
            percentage={String(100 * s.amount / totalAmount)}
            colorTitle={colorTitle}
            colorBar={colorBar}
            amount={s.amount}
          />
        );
      })}
    </TabPane>
  );
};

const CategorySummaryPieChartTab = ({ tabId, type, title, categorySummary }) => {
  const totalAmount = categorySummary
    .map(s => s.amount)
    .reduce((a, b) => a + b, 0);

  categorySummary = categorySummary.map(s => {
    return { ...s, amount: Math.abs(s.amount) };
  });
  return (
    <TabPane tabId={tabId} style={{ minHeight: 250 }}>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart >
          <Pie data={categorySummary} dataKey="amount" nameKey="categoryName">
            {categorySummary.map((_, idx) => (
              <Cell
                key={idx}
                fill={
                  Object.values(PRESET_COLOR_MAP)[
                    idx % Object.values(PRESET_COLOR_MAP).length
                  ]
                }
              />
            ))}
            <LabelList dataKey="categoryName" position="outside" />
          </Pie>
          {/* # TODO: currency */}
          <Tooltip formatter={
            (amount, _, categorySummary) => {
              amount = (type === "INCOME" ? amount : -1 * amount);
              return <div>
                <Currency amount={amount} />
                {" "}<span>({Math.round(100 * Math.abs(amount) / Math.abs(totalAmount))}%)</span>
              </div>;
            }}/>
        </PieChart>
      </ResponsiveContainer>
    </TabPane>
  );
};

export default class CategorySummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "2"
    }
  }

  toggleTab(tabId) {
    if (this.state.activeTab !== tabId) {
      this.setState({
        activeTab: tabId
      });
    }
  }

  render() {
    const { categorySummary, type, title, colorTitle, colorBar } = this.props;
    if (!categorySummary) {
      return (
        <div>
          <Section>{title}</Section>
          <span>N/A</span>
        </div>
      );
    }

    return <div>
        <Section>{title}</Section>
        <Nav tabs>
          <NavItem>
            <NavLink className={this.state.activeTab === "1" ? "active" : ""} onClick={() => {
                this.toggleTab("1");
              }}>
              <i className="fa fa-list" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={this.state.activeTab === "2" ? "active" : ""} onClick={() => {
                this.toggleTab("2");
              }}>
              <i className="fa fa-pie-chart" />
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <CategorySummaryLineChartTab tabId="1" type={type} title={title} categorySummary={categorySummary} colorTitle={colorTitle} colorBar={colorBar} />
          <CategorySummaryPieChartTab tabId="2" type={type} title={title} categorySummary={categorySummary} />
        </TabContent>
      </div>;
  }
}
