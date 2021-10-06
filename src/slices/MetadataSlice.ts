import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";

export type ScreenType = "categories" | "locations"
export type ModalType = "edit" | "add" | "delete";

interface MetadataState {
    currentScreen: ScreenType;
    modalStatus: ModalType | "";
}

export const selectCurrentScreen = (state: RootState) =>
    state.metaData.currentScreen;

export const selectIsInputModalOpen = (state: RootState) =>
    ["edit", "add"].includes(state.metaData.modalStatus);

export const selectIsDeleteModalOpen = (state: RootState) =>
    state.metaData.modalStatus === "delete";
export const selectIsModalType = (state: RootState) =>
    state.metaData.modalStatus;

export const setScreenState = (newVal: ScreenType): AppThunk => (dispatch) => {
    dispatch(setCurrentScreen(newVal));
};

export const openModal = (type: ModalType): AppThunk => (dispatch) => {
    dispatch(setModalState(type));
};

export const closeModal = (): AppThunk => (dispatch) => {
    dispatch(setModalState(""));
};

const metadataSlice = createSlice({
    name: "metadata",
    initialState: {
        currentScreen: "categories"
    } as MetadataState,
    reducers: {
        setCurrentScreen: (state, action: PayloadAction<ScreenType>) => {
            state.currentScreen = action.payload;
        },
        setModalState: (state, action: PayloadAction<ModalType | "">) => {
            state.modalStatus = action.payload;
        },
    },
});

const {
    setCurrentScreen,
    setModalState
} = metadataSlice.actions;

export default metadataSlice.reducer;
