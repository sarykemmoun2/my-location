import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    getLocations,
    addLocationAPI,
    updateLocationAPI,
    deleteLocationAPI,
    LocationType,
} from "../APIs/LocationsAPI";
import { AppThunk, RootState } from "../store";

const LOCATION_EXISTS = "Location already exists"
export type ModalType = "edit" | "add" | "delete"
    ;
interface LocationsState {
    locationsList: LocationType[];
    currentLocation: LocationType | null;
    error: string | null;
}

export const selectLocationsList = (state: RootState) =>
    state.locations.locationsList;
export const selectCurrentLocation = (state: RootState) =>
    state.locations.currentLocation;
export const selectError = (state: RootState) => state.locations.error;

export const getData = (): AppThunk => (dispatch) => {
    const data = getLocations();
    dispatch(dataLoaded(data));
};

export const chooseLocation = (location: LocationType): AppThunk => (dispatch) => {
    dispatch(setCurrentLocation(location));
};

export const filterByCategory = (category?: string): AppThunk => (dispatch, getState) => {
    if (!category) {
        dispatch(getData());
    } else {
        const filteredList = getState().locations.locationsList.filter(location => location.category === category);
        dispatch(dataLoaded(filteredList));

    }
};

export const addLocation = (location: LocationType): AppThunk => (dispatch) => {
    addLocationAPI(location)
        ? dispatch(getData())
        : dispatch(setError(LOCATION_EXISTS));
};

export const removeLocation = (location: LocationType): AppThunk => (dispatch) => {
    deleteLocationAPI(location);
    dispatch(getData());
    dispatch(clearCurrentLocation());
};

export const clearCurrentLocation = (): AppThunk => (dispatch) => {
    dispatch(setCurrentLocation(null));
};

export const hideError = (): AppThunk => (dispatch) => {
    dispatch(setError(null));
};

export const updateLocation = (
    oldLocation: LocationType,
    newLocation: LocationType
): AppThunk => (dispatch) => {
    if (updateLocationAPI(oldLocation, newLocation)) {
        dispatch(getData());
        dispatch(setCurrentLocation(newLocation))
    } else {
        dispatch(setError(LOCATION_EXISTS));
    }
};
const locationsSlice = createSlice({
    name: "locations",
    initialState: {
        locationsList: [],
        currentLocation: null,
        error: null,
    } as LocationsState,
    reducers: {
        dataLoaded: (state, action: PayloadAction<LocationType[]>) => {
            state.locationsList = action.payload;
        },
        setCurrentLocation: (state, action: PayloadAction<LocationType | null>) => {
            state.currentLocation = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    },
});

const {
    dataLoaded,
    setCurrentLocation,
    setError
} = locationsSlice.actions;

export default locationsSlice.reducer;
