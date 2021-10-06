import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import CategoriesSlice from './slices/CategoriesSlice';
import LocationsSlice from './slices/LocationsSlice';
import MetadataSlice from './slices/MetadataSlice';

export const store = configureStore({
        reducer: {
                categories: CategoriesSlice,
                locations: LocationsSlice,
                metaData: MetadataSlice
        },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
