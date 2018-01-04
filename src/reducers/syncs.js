import * as actionTypes from "../actions/types";
import * as syncService from "../services/syncService";
import { syncStatuses } from "../models/SyncStatus";

const initState = {
  syncs: [],
  loading: false,
  failed: false
};

// Return a new sync array that replaces the old sync with the new
const newSyncsState = (syncs, sync) => {
  const newState = [];
  syncs.forEach(s => {
    if (s.remote === sync.remote) {
      newState.push(sync);
    } else {
      newState.push(s);
    }
  });
  syncService.save(newState);
  return newState;
}

const handleSyncAction = (state, action) => {
  const { syncs } = state;
  const { sync, error } = action;
  let newSyncs = [];
  switch (action.type) {
    case actionTypes.SYNC_STARTED:
      sync.status = syncStatuses.ACTIVE;
      newSyncs = newSyncsState(syncs, sync);
      return {
        ...state,
        syncs: newSyncs
      }
    case actionTypes.SYNC_DENIED:
      // FALLTHROUGH
    case actionTypes.SYNC_ERRORED:
      sync.status = syncStatuses.FAILED;
      sync.error = error;
      newSyncs = newSyncsState(syncs, sync);
      return {
        ...state,
        syncs: newSyncs
      }
    case actionTypes.SYNC_PAUSED:
      if (error) {
        sync.status = syncStatuses.FAILED;
        sync.error = error;
      } else {
        sync.status = syncStatuses.ACTIVE;
      }
      newSyncs = newSyncsState(syncs, sync);
      return {
        ...state,
        syncs: newSyncs
      }
    default:
      return state;
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SYNCS_REQUESTED:
      return {
        ...state,
        loading: true,
        failed: false
      };
    case actionTypes.FETCH_SYNCS_FAILED:
      return {
        ...state,
        loading: false,
        failed: true
      };
    case actionTypes.FETCH_SYNCS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        failed: false,
        syncs: action.payload
      };
    case actionTypes.SYNC_STARTED:
      // FALLTHROUGH
    case actionTypes.SYNC_DENIED:
      // FALLTHROUGH
    case actionTypes.SYNC_ERRORED:
      // FALLTHROUGH
    case actionTypes.SYNC_PAUSED:
      return handleSyncAction(state, action);
    default:
      return state;
  }
};
