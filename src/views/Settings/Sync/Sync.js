import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Badge,
  Button,
  ButtonGroup,
  Row,
  Col,
  Table
} from "reactstrap";
import { Field, reduxForm } from "redux-form";
import InputField from "../../../components/InputField/InputField";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import * as vu from "valid-url";
import Sync from "../../../models/Sync";
import RefreshButton from "../../../components/RefreshButton/RefreshButton";
import { syncStatuses } from "../../../models/SyncStatus";
import ListActionButton from "../../../components/ListActionButton/ListActionButton";
import DeleteButton from "../../../components/ListActionButton/DeleteButton";
import ReactTooltip from "react-tooltip";

const validUrl = value =>
  vu.isWebUri(value) ? undefined : "Must be a valid url";

let SyncSetupForm = ({ handleSubmit, onSubmit, reset }) => {
  return (
    <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
      <Field
        name="remote"
        label="Target address"
        component={InputField}
        otherProps={{
          placeholder: "e.g., http://admin:password@localhost:5984/florin"
        }}
        validate={[validUrl]}
      />
      <Button type="submit" color="success">
        Add
      </Button>
      <Button color="secondary" onClick={reset}>
        Reset
      </Button>
    </form>
  );
};

SyncSetupForm = reduxForm({ form: "syncSetup" })(SyncSetupForm);

const renderStatus = sync => {
  const { status } = sync;
  if (status === syncStatuses.FAILED) {
    return (
      <Badge pill color="danger" data-tip data-for={`${sync.remote}`}>
        Failed
        <ReactTooltip place="top" id={`${sync.remote}`} type="info" effect="solid">
          Synchronization failed.
        </ReactTooltip>
      </Badge>
    );
  }
  if (status === syncStatuses.ACTIVE) {
    return (
      <Badge pill color="success" data-tip data-for={`${sync.remote}`}>
        Active
        <ReactTooltip place="top" id={`${sync.remote}`} type="info" effect="solid">
          Synchronization is active.
        </ReactTooltip>
      </Badge>
    );
  }
  if (status === syncStatuses.CANCELED) {
    return (
      <Badge pill color="secondary" data-tip data-for={`${sync.remote}`}>
        Canceled
        <ReactTooltip place="top" id={`${sync.remote}`} type="info" effect="solid">
          Synchronization canceled.
        </ReactTooltip>
      </Badge>
    );
  }

  return (
    <Badge pill color="secondary" data-tip data-for={`${sync.remote}`}>
      Not Started
      <ReactTooltip place="top" id={`${sync.remote}`} type="info" effect="solid">
        Synchronization has not started.
      </ReactTooltip>
    </Badge>
  );
};

class SyncView extends Component {
  componentDidMount() {
    this.props.fetchSyncs();
  }

  render() {
    const syncsState = this.props.syncs;
    const { syncs } = syncsState;
    const { startSync, createSync, fetchSyncs, deleteSync } = this.props;
    return (
      <Row>
        <Col xs="12" lg="12">
          <Card>
            <CardHeader>
              <strong>Add New Sync</strong>
            </CardHeader>
            <CardBody>
              <SyncSetupForm
                onSubmit={props => {
                  createSync(new Sync(props));
                  fetchSyncs();
                }}
              />
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <strong>Current Targets</strong>
              {syncsState.loading ? (
                <i className="fa fa-refresh fa-spin fa-1x fa-fw" />
              ) : (
                <span />
              )}
              <ButtonGroup className="float-right">
                <RefreshButton onClick={fetchSyncs} />
              </ButtonGroup>
            </CardHeader>
            <CardBody>
              {syncs.length === 0 ? (
                <h2>Not sync'ing with any remotes.</h2>
              ) : (
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Remote URL</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {syncs.map((sync, idx) => {
                      return (
                        <tr key={sync.remote}>
                          <td>{sync.getRedactedRemoteUrl()}</td>
                          <td>{renderStatus(sync)}</td>
                          <td>
                            <ButtonGroup>
                              <ListActionButton
                                objectId={`sync-${idx}`}
                                color="success"
                                tooltip="Start synchronization with this remote"
                                onClick={() => {
                                  startSync(sync);
                                }}
                                icon="fa-refresh"
                              />
                              <DeleteButton
                                objectId={`sync-${idx}`}
                                onClick={() => {
                                  deleteSync(sync);
                                  fetchSyncs();
                                }}
                              />
                            </ButtonGroup>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ syncs }) => {
  return { syncs };
};

export default connect(mapStateToProps, actions)(SyncView);
