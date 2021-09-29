import { ListItem } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from "classnames";
import { selectCurrentCategory, chooseCategory, clearCurrentCategory } from '../../slices/CategoriesSlice';
import "./categories.css";

const CategoryItem: React.FC<{ categoryName: string }> = ({ categoryName }) => {
    const dispatch = useDispatch();
    const currentCategory = useSelector(selectCurrentCategory);
    const handleChooseCategory = () => {
        dispatch(currentCategory === categoryName ? clearCurrentCategory() : chooseCategory(categoryName))
    }
    return <ListItem className={classnames("listItem", currentCategory === categoryName && "chosenListItem")} onClick={handleChooseCategory}>{categoryName}</ListItem>
}

export default CategoryItem;

