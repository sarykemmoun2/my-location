import { List } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData, selectCategoriesList } from '../../slices/CategoriesSlice';
import CategoryItem from './CategoryItem';

const CategoriesList: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getData());
    }, [dispatch])

    const list = useSelector(selectCategoriesList);
    return list.length > 0 ? <List>{list.map(category => <CategoryItem key={category} categoryName={category} />)}</ List> : <div className="empty">No categories</div>
}

export default CategoriesList;

