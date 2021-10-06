import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScreenType, selectCurrentScreen, setScreenState } from "../slices/MetadataSlice";
import { selectCategoriesList, displayError, clearCurrentCategory, NO_CATEGORIES } from "../slices/CategoriesSlice";
import { clearCurrentLocation } from "../slices/LocationsSlice";
import Button from "./common/MLButton";
import Toolbar from "./common/MLToolbar";

const BottomToolbar: React.FC = () => {
    const currentScreen = useSelector(selectCurrentScreen);
    const categoriesList = useSelector(selectCategoriesList);
    const dispatch = useDispatch();

    const getColorFor = (screen: ScreenType) => {
        return currentScreen === screen ? "primary" : "inherit"
    }

    const renderButton = (title: ScreenType) => {
        const changeScreen = () => {
            if (currentScreen === "categories" && categoriesList.length === 0) {
                dispatch(displayError(NO_CATEGORIES));
            } else {
                dispatch(setScreenState(title));
                dispatch(clearCurrentLocation());
                dispatch(clearCurrentCategory());
            }
        }
        return (
            <Button onClick={changeScreen} color={getColorFor(title) || "default"} title={title} />
        )
    }

    return (
        <Toolbar position="fixed" sx={{ top: "auto", bottom: 0 }}>
            {renderButton("categories")}
            {renderButton("locations")}
        </Toolbar>)

}

export default BottomToolbar;

