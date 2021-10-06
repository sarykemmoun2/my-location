import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getCategories,
  addCategoryAPI,
  updateCategoryAPI,
  deleteCategoryAPI,
} from "../APIs/CategoriesAPIs";
import { AppThunk, RootState } from "../store";

interface CategoriesState {
  categoriesList: string[];
  currentCategory: string | null;
  error: string | null;
}

const CATEGORY_EXISTS = "Category already exists";
export const NO_CATEGORIES = "First, insert categoties"

export const selectCategoriesList = (state: RootState) =>
  state.categories.categoriesList;
export const selectCurrentCategory = (state: RootState) =>
  state.categories.currentCategory;
export const selectError = (state: RootState) => state.categories.error;

export const getData = (): AppThunk => (dispatch) => {
  const data = getCategories();
  dispatch(dataLoaded(data));
};

export const chooseCategory = (category: string): AppThunk => (dispatch) => {
  dispatch(setCurrentCategory(category));
};

export const addCategory = (category: string): AppThunk => (dispatch) => {
  addCategoryAPI(category)
    ? dispatch(getData())
    : dispatch(setError(CATEGORY_EXISTS));
};

export const displayError = (error: string): AppThunk => (dispatch) => {
  dispatch(setError(error))
}
export const removeCategory = (category: string): AppThunk => (dispatch) => {
  deleteCategoryAPI(category);
  dispatch(getData());
  dispatch(clearCurrentCategory());
};

export const hideError = (): AppThunk => (dispatch) => {
  dispatch(setError(null));
};

export const clearCurrentCategory = (): AppThunk => (dispatch) => {
  dispatch(setCurrentCategory(null));
};

export const updateCategory = (
  oldCategory: string,
  newName: string
): AppThunk => (dispatch) => {
  if (updateCategoryAPI(oldCategory, newName)) {
    dispatch(getData());
    dispatch(setCurrentCategory(newName))
  } else {
    dispatch(setError(CATEGORY_EXISTS));
  }
};
const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categoriesList: [],
    currentCategory: null,
    error: null,
  } as CategoriesState,
  reducers: {
    dataLoaded: (state, action: PayloadAction<string[]>) => {
      state.categoriesList = action.payload;
    },
    setCurrentCategory: (state, action: PayloadAction<string | null>) => {
      state.currentCategory = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

const {
  dataLoaded,
  setCurrentCategory,
  setError,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
