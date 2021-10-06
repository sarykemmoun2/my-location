import React from 'react';
import CategoriesList from './categories/CategoriesList';
import TopToolbar from './common/TopToolbar';
import { useSelector } from 'react-redux';
import { selectCurrentScreen } from '../slices/MetadataSlice';
import BottomToolbar from './BottomToolbar';
import LocationsList from './locations/LocationsList';

const MainScreen: React.FC = () => {
    const currentScreen = useSelector(selectCurrentScreen);

    return <div>
        <TopToolbar />
        {currentScreen === "locations" ? <LocationsList /> : <CategoriesList />}
        <BottomToolbar />
    </div>
}

export default MainScreen;

