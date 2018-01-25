import reducer from "./categories";
import * as actionCreators from "../actions/creators";
import Category from "../models/Category";

describe("categories reducer", () => {
  it("should populate empty when fetch succeeded with empty results", () => {
    const state = {
      categories: [],
      categoriesIdMap: {}
    };

    const newState = reducer(
      state,
      actionCreators.fetchCategoriesSucceeded([])
    );

    expect(newState.categories).toEqual([]);
    expect(newState.categoriesIdMap).toEqual({});
  });

  it("should populate idMap when fetch succeeded", () => {
    const state = {
      categories: [],
      categoriesIdMap: {}
    };
    const categories = [
      new Category({ _id: "c1", name: "C1" }),
      new Category({ _id: "c2", name: "C2" }),
      new Category({ _id: "c3", name: "C3" })
    ];
    const newState = reducer(
      state,
      actionCreators.fetchCategoriesSucceeded(categories)
    );

    expect(newState.categories).toEqual(categories);
    expect(newState.categoriesIdMap["c1"]).toEqual(categories[0]);
    expect(newState.categoriesIdMap["c2"]).toEqual(categories[1]);
    expect(newState.categoriesIdMap["c3"]).toEqual(categories[2]);
    expect(newState.loading).toEqual(false);
    expect(newState.failed).toEqual(false);
  });

  it("should set loading/failed for fetch requested", () => {
    const newState = reducer({}, actionCreators.fetchCategoriesRequested());
    expect(newState.loading).toEqual(true);
    expect(newState.failed).toEqual(false);
  });

  it("should set loading/failed for fetch failed", () => {
    const newState = reducer({}, actionCreators.fetchCategoriesFailed());
    expect(newState.loading).toEqual(false);
    expect(newState.failed).toEqual(true);
  });

  it("should populate categories state when create category succeeded", () => {
    const state = {
      categories: [],
      categoriesIdMap: {}
    };

    const newState = reducer(
      state,
      actionCreators.createCategorySucceeded(
        new Category({ _id: "c1", name: "C1" })
      )
    );
    expect(newState.categories).toEqual([
      new Category({ _id: "c1", name: "C1" })
    ]);
    expect(newState.categoriesIdMap["c1"]).toEqual(
      new Category({ _id: "c1", name: "C1" })
    );
  });

  it("should reset subcategories' parent when category is deleted", () => {
    const c1 = new Category({ _id: "c1", name: "C1" });
    const c2 = new Category({ _id: "c2", name: "C2", parent: "c1" });
    const c3 = new Category({ _id: "c3", name: "C3", parent: "c1" });
    const state = {
      categories: [c1, c2, c3],
      categoriesIdMap: {
        c1,
        c2,
        c3
      }
    };

    const newState = reducer(
      state,
      actionCreators.deleteCategorySucceeded("c1")
    );
    expect(newState.categories).toEqual([
      new Category({ _id: "c2", name: "C2", parent: undefined }),
      new Category({ _id: "c3", name: "C3", parent: undefined })
    ]);
    expect(newState.categoriesIdMap).toEqual({
      c2: new Category({ _id: "c2", name: "C2", parent: undefined }),
      c3: new Category({ _id: "c3", name: "C3", parent: undefined })
    });
  });
});
