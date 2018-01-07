const initState = {
  location: null
};

export default (state = initState, action) => {
  switch (action.type) {
    case "@@router/LOCATION_CHANGE":
      return {
        ...state,
        location: action.payload
      };
    default:
      return state;
  }
};
