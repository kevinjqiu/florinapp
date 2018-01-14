import * as actionTypes from "../actions/types";

const initState = {
  categories: [],
  loading: false,
  failed: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIES_SUCCEEDED:
      return {
        ...state,
        categories: action.payload,
        loading: false,
        failed: false
      };
    case actionTypes.FETCH_CATEGORIES_REQUESTED:
      return {
        ...state,
        loading: true,
        failed: false
      };
    case actionTypes.FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        loading: false,
        failed: true
      };
    case actionTypes.CREATE_CATEGORY_SUCCEEDED:
      let { categories } = state;
      categories = [...categories, action.category]
      categories.sort((a, b) => a._id.localeCompare(b._id))
      return {
        ...state,
        categories
      }
    default:
      return state;
  }
};
