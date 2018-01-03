import React from "react";
import { FormGroup, Col, Label, Input, FormFeedback } from "reactstrap";

export default ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => {
  const options = touched ? { ...input, valid: !error } : { ...input };
  return (
    <div className="form-group">
      <FormGroup row>
        <Col md="3">
          <Label htmlFor="{input.name}">{label}</Label>
        </Col>
        <Col xs="12" md="9">
          <Input {...options} />
          <FormFeedback>{error}</FormFeedback>
        </Col>
      </FormGroup>
    </div>
  );
};
