import React from "react";
import ListActionButton from "./ListActionButton";

export default ({ objectId }) => {
  return (
    <ListActionButton
      id={`btn-view-${objectId}`}
      color="primary"
      icon="fa-pencil-square-o"
      tooltip="View"
    />
  );
};