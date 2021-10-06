import React from 'react';
import { useSelector } from 'react-redux';
import { InputLabel, Select, MenuItem } from '@mui/material';
import { selectCategoriesList } from '../../slices/CategoriesSlice';

type Props = {
    onSelect: (val: string) => void,
    category?: string,
    title?: string
}
const CategoriesPicker: React.FC<Props> = ({ onSelect, category, title }) => {
    const categories = useSelector(selectCategoriesList);

    return (
        <>
            <InputLabel >{title || "Category"}</InputLabel>
            <Select
                value={category}
                label="Category"
                onChange={(e) => {
                    onSelect(e.target.value)
                }}>
                {
                    categories.map(category => <MenuItem value={category}>{category}</MenuItem>)
                }
            </Select>
        </>
    )

}

export default CategoriesPicker;