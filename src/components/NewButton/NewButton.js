import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

export default ({linkUrl, caption, ...options}) => {
  return (
    <Link to={linkUrl}>
      <Button color="success" size="sm" outline {...options}>
        <i className="fa fa-refresh" aria-hidden="true" />
        {caption ? `\u00A0${caption}` : ""}
      </Button>
    </Link>
  );
};
