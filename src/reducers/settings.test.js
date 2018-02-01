import reducer from "./settings";
import * as actionTypes from "../actions/types";
import Settings from "../models/Settings";

describe("settings reducer", () => {
  it("should update state if fetch settings succeeded", () => {
    const state = {
      settings: null
    }

    const newSettings = new Settings({})
    const newState = reducer(state, {
      type: actionTypes.FETCH_SETTINGS_SUCCEEDED,
      settings: newSettings
    })

    expect(newState.settings).toEqual(newSettings);
  })

  it("should update state if update settings succeeded", () => {
    const state = {
      settings: new Settings({locale: "en_GB"})
    }

    const newSettings = new Settings({locale: "en_CA"})
    const newState = reducer(state, {
      type: actionTypes.UPDATE_SETTINGS_SUCCEEDED,
      settings: newSettings
    })

    expect(newState.settings).toEqual(newSettings);
  })
})