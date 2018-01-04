import sinon from "sinon";
import reducer from "./syncs";
import * as actionTypes from "../actions/types";
import * as syncService from "../services/syncService";

describe("syncs reducer", () => {
  it("should populate empty syncs when fetch succeeded with empty syncs", () => {
    const state = {
      syncs: [],
      loading: false,
      failed: false
    };
    const newState = reducer(state, {
      type: actionTypes.FETCH_SYNCS_SUCCEEDED,
      payload: []
    });
    expect(newState.syncs).toEqual([]);
  });

  it("should populate syncs when fetch succeeded with syncs", () => {
    const state = {
      syncs: [],
      loading: false,
      failed: false
    };
    const newState = reducer(state, {
      type: actionTypes.FETCH_SYNCS_SUCCEEDED,
      payload: [
        {
          remote: "http://localhost/foo"
        },
        {
          remote: "http://localhost/bar"
        }
      ]
    });
    expect(newState.syncs).toEqual([
      {
        remote: "http://localhost/foo"
      },
      {
        remote: "http://localhost/bar"
      }
    ]);
  });

  it("should set status to failed when sync denied", () => {
    const mockSave = sinon.stub(syncService, "save");
    const state = {
      syncs: [
        {
          remote: "http://localhost/foo"
        },
        {
          remote: "http://localhost/bar"
        }
      ]
    };
    const action = {
      type: actionTypes.SYNC_DENIED,
      sync: { remote: "http://localhost/foo" },
      error: {error: "ERROR"}
    }
    const newState = reducer(state, action);
    expect(newState.syncs).toEqual([
        {
          remote: "http://localhost/foo",
          status: "FAILED",
          error: {error: "ERROR"}
        },
        {
          remote: "http://localhost/bar"
        }
    ])
    mockSave.restore();
  });

  it("should set status to failed when sync errored", () => {
    const mockSave = sinon.stub(syncService, "save");
    const state = {
      syncs: [
        {
          remote: "http://localhost/foo"
        },
        {
          remote: "http://localhost/bar"
        }
      ]
    };
    const action = {
      type: actionTypes.SYNC_ERRORED,
      sync: { remote: "http://localhost/foo" },
      error: {error: "ERROR"}
    }
    const newState = reducer(state, action);
    expect(newState.syncs).toEqual([
        {
          remote: "http://localhost/foo",
          status: "FAILED",
          error: {error: "ERROR"}
        },
        {
          remote: "http://localhost/bar"
        }
    ])
    mockSave.restore();
  });

  it("should set status to failed when sync paused with error", () => {
    const mockSave = sinon.stub(syncService, "save");
    const state = {
      syncs: [
        {
          remote: "http://localhost/foo"
        },
        {
          remote: "http://localhost/bar"
        }
      ]
    };
    const action = {
      type: actionTypes.SYNC_PAUSED,
      sync: { remote: "http://localhost/foo" },
      error: {error: "ERROR"}
    }
    const newState = reducer(state, action);
    expect(newState.syncs).toEqual([
        {
          remote: "http://localhost/foo",
          status: "FAILED",
          error: {error: "ERROR"}
        },
        {
          remote: "http://localhost/bar"
        }
    ])
    mockSave.restore();
  });

  it("should set status to active when sync paused without error", () => {
    const mockSave = sinon.stub(syncService, "save");
    const state = {
      syncs: [
        {
          remote: "http://localhost/foo"
        },
        {
          remote: "http://localhost/bar"
        }
      ]
    };
    const action = {
      type: actionTypes.SYNC_PAUSED,
      sync: { remote: "http://localhost/foo" },
    }
    const newState = reducer(state, action);
    expect(newState.syncs).toEqual([
        {
          remote: "http://localhost/foo",
          status: "ACTIVE",
        },
        {
          remote: "http://localhost/bar"
        }
    ])
    mockSave.restore();
  });
});
