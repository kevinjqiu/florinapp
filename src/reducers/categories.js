import * as actionTypes from "../actions/types";

const initState = {
  categories: [],
  categoriesIdMap: {}, // this is derived from categories
  loading: false,
  failed: false
};

const idMap = (categories) => {
  return categories.reduce((aggregate, category) => {
    aggregate[category._id] = category;
    return aggregate;
  }, {});
}

export default (state = initState, action) => {
  let categories;
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIES_SUCCEEDED:
      return {
        ...state,
        categories: action.payload,
        categoriesIdMap: idMap(action.payload),
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
      categories = [...state.categories, action.category]
      categories.sort((a, b) => a._id.localeCompare(b._id))
      return {
        ...state,
        categories,
        categoriesIdMap: idMap(categories)
      }
    case actionTypes.DELETE_CATEGORY_SUCCEEDED:
      categories = state.categories.filter(category => category._id !== action.categoryId);
      categories.forEach((category) => {
        if (category.parent === action.categoryId) {
          category.parent = undefined;
        }
      });
      return {
        ...state,
        categories,
        categoriesIdMap: idMap(categories)
      }
    default:
      return state;
  }
};
