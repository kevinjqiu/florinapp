const initState = {
  asideType: null
};

const getAsideTypeFromLocation = (location: Location) => {
  if (location.pathname.startsWith("/transactions")) {
    return "TransactionListAside";
  }
  return null;
}

export default (state = initState, action) => {
  switch (action.type) {
    case "@@router/LOCATION_CHANGE":
      return {
        ...state,
        asideType: getAsideTypeFromLocation(action.payload)
      };
    default:
      return state;
  }
};
