// @flow

export default type FetchOptions = {
  orderBy: [string, string]
  pagination: {
    page: Number, perPage: Number
  }
};
