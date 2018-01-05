import React from "react";
import { Button } from "reactstrap";
import ReactTooltip from "react-tooltip";

export default ({ id, color, icon, tooltip, onClick }) => {
  const tooltipId = `tooltip-${id}`;
  return (
    <Button size="sm" color={color} data-tip data-for={tooltipId} onClick={onClick}>
      <i className={`fa ${icon}`} aria-hidden="true" />
      <ReactTooltip place="top" id={tooltipId} type="info" effect="solid">
        {tooltip}
      </ReactTooltip>
    </Button>
  );
};
