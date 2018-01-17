import React from "react";
import { Progress } from "reactstrap";
import ReactTooltip from "react-tooltip";
import * as currencyFormatter from "currency-formatter";

export const Section = ({ children }) => {
  return (
    <div>
      <div className="callout m-0 py-2 text-muted text-center bg-light text-uppercase">
        <small>{children}</small>
      </div>
      <hr className="transparent mx-3 my-0" />
    </div>
  );
};

export const Callout = ({ color, textLeft, textRight }) => {
  return (
    <div>
      <div className={`callout callout-${color}`}>
        <small className="text-muted">{textLeft}</small>
        <br />
        <strong className="h4">{textRight}</strong>
      </div>
    </div>
  );
};

export const CalloutBar = ({
  id,
  text,
  percentage,
  colorTitle,
  colorBar,
  amount
}) => {
  const tooltipId = `tooltip-${id}`;
  return (
    <div className={`callout callout-${colorTitle}`} style={{ border: "0px" }}>
      <ul className="horizontal-bars" data-tip data-for={tooltipId}>
        <li>
          <div className="title">{text}</div>
          <div className="bars">
            <Progress
              className="progress-xs"
              color={colorBar}
              value={percentage}
            />
          </div>
        </li>
      </ul>
      <ReactTooltip place="top" id={tooltipId} type="info" effect="solid">
        {currencyFormatter.format(amount, { code: "CAD" })}
      </ReactTooltip>
    </div>
  );
};
