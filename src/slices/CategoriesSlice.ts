import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getCategories,
  addCategoryAPI,
  updateCategoryAPI,
  deleteCategoryAPI,
} from "../APIs/CategoriesAPIs";
import { AppThunk, RootState } from "../store";

export type ModalType = "edit" | "add" | "delete"
  ;
interface CategoriesState {
  categoriesList: string[];
  currentCategory: string | null;
  error: string | null;
  modalStatus: ModalType | "";
}

const CATEGORY_EXISTS = "Category already exists";

export const selectCategoriesList = (state: RootState) =>
  state.categories.categoriesList;
export const selectCurrentCategory = (state: RootState) =>
  state.categories.currentCategory;
export const selectError = (state: RootState) => state.categories.error;
export const selectIsInputModalOpen = (state: RootState) =>
  ["edit", "add"].includes(state.categories.modalStatus);
export const selectIsDeleteModalOpen = (state: RootState) =>
  state.categories.modalStatus === "delete";
export const selectIsModalType = (state: RootState) =>
  state.categories.modalStatus;

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

export const openModal = (type: ModalType): AppThunk => (dispatch) => {
  dispatch(setModalState(type));
};

export const closeModal = (): AppThunk => (dispatch) => {
  dispatch(setModalState(""));
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
    modalStatus: "",
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
    setModalState: (state, action: PayloadAction<ModalType | "">) => {
      state.modalStatus = action.payload;
    },
  },
});

const {
  dataLoaded,
  setCurrentCategory,
  setError,
  setModalState,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
