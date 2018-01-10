import React from "react";
import { Label, Input } from "reactstrap";
import ReactTooltip from "react-tooltip";

export default ({ onChange, text, tooltipText, tooltipId, defaultChecked }) => {
  return (
    <span>
      <Label
        className="switch switch-3d switch-primary"
        data-tip
        data-for={tooltipId}
      >
        <Input
          type="checkbox"
          className="switch-input"
          onChange={onChange}
          defaultChecked={defaultChecked}
        />
        <span className="switch-label" />
        <span className="switch-handle" />
      </Label>{" "}
      <span style={{ marginRight: 5 }} data-tip data-for={tooltipId}>
        {text}
      </span>
      <ReactTooltip id={tooltipId}>{tooltipText}</ReactTooltip>
    </span>
  );
};
