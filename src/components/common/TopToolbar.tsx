import Button from './MLButton';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toolbar from './MLToolbar';
import { selectCurrentCategory } from '../../slices/CategoriesSlice';
import { selectCurrentLocation } from '../../slices/LocationsSlice';
import { selectCurrentScreen, openModal, ModalType } from '../../slices/MetadataSlice';
import "./list.css";

const TopToolbar: React.FC = () => {
  const currentCategory = useSelector(selectCurrentCategory);
  const currentLocation = useSelector(selectCurrentLocation)
  const currentScreen = useSelector(selectCurrentScreen);

  const dispatch = useDispatch();

  const open = (type: ModalType) => {
    dispatch(openModal(type));
  }

  const renderTitle = () => {
    return currentScreen === "locations" ? (currentLocation?.name || "Locations") : (currentCategory || "Categories")
  }

  const isSelectedFocused = () => {
    return (currentCategory && currentScreen === "categories") || (currentLocation && currentScreen === "locations")
  }
  return (
    <Toolbar>
      <Button onClick={() => open("add")} title="ADD" />
      {isSelectedFocused() && <>
        <Button onClick={() => open("edit")} title="EDIT" />
        <Button onClick={() => open("delete")} title="DELETE" />
      </>}
      <div className="toolbar-title">
        {renderTitle()}
      </div>
    </Toolbar>)

}

export default TopToolbar;

