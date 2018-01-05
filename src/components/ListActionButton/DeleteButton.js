import React from "react";
import ListActionButton from "./ListActionButton";

export default ({ objectId, onClick }) => {
  return (
    <ListActionButton
      id={`btn-delete-${objectId}`}
      color="danger"
      icon="fa-trash"
      tooltip="Delete"
      onClick={onClick}
    />
  );
};
