import React from "react";
import { Button } from "reactstrap";
import ReactTooltip from "react-tooltip";

export default ({ id, color, icon, tooltip, onClick, outline = false, disabled = false }) => {
  const tooltipId = `tooltip-${id}`;
  return (
    <Button
      size="sm"
      color={color}
      data-tip
      data-for={tooltipId}
      onClick={onClick}
      outline={outline}
      disabled={disabled}
    >
      <i className={`fa ${icon}`} aria-hidden="true" />
      <ReactTooltip place="top" id={tooltipId} type="info" effect="solid">
        {tooltip}
      </ReactTooltip>
    </Button>
  );
};
