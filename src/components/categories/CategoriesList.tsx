import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData, selectCategoriesList, selectError, hideError, clearCurrentCategory, chooseCategory, selectCurrentCategory } from '../../slices/CategoriesSlice';
import List from '../common/MLList';
import AddEditCategoryModal from './AddEditCategoryModal';
import DeleteCategoryModal from './DeleteCategoryModal';
import ErrorAlert from '../common/ErrorAlert';
import { GridColDef } from '@mui/x-data-grid';

const CategoriesList: React.FC = () => {
    const dispatch = useDispatch();
    const error = useSelector(selectError);
    const currentCategory = useSelector(selectCurrentCategory)
    useEffect(() => {
        dispatch(getData());
    }, [dispatch])

    const handleCloseError = () => {
        dispatch(hideError())
    }

    const list = useSelector(selectCategoriesList);

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'name', width: 300, sortable: false },
    ];

    const handleChooseCategory = (row: any) => {
        dispatch(currentCategory === row.name ? clearCurrentCategory() : chooseCategory(row.name))
    }

    return <>
        <ErrorAlert error={error} onClose={handleCloseError} />
        <List
            rows={list.map(item => { return { name: item, id: item } })}
            columns={columns}
            handleChooseRow={(item) => {
                handleChooseCategory(item);

            }}
        />
        <AddEditCategoryModal />
        <DeleteCategoryModal />
    </>
}

export default CategoriesList;

