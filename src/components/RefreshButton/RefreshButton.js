import React from "react";
import { Button } from "reactstrap";

export default ({ withCaption = true, onClick }) => {
  return (
    <Button color="primary" size="sm" outline onClick={onClick}>
      <i className="fa fa-refresh" aria-hidden="true" />
      {withCaption ? "\u00A0Refresh" : ""}
    </Button>
  );
};
