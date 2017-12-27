import React from "react";
import { Button } from "reactstrap";

export default ({onClick}) => {
  return <Button color="primary" size="sm" outline onClick={onClick}>
                    <i className="fa fa-refresh" aria-hidden="true" />
                    {"\u00A0"}Refresh
          </Button>
}