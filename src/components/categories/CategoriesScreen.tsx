import React from 'react';
import AddEditModal from './AddEditModal';
import CategoriesList from './CategoriesList';
import CategoriesToolbar from './CategoriesToolbar';
import { useDispatch, useSelector } from 'react-redux';
import { hideError, selectError } from '../../slices/CategoriesSlice';
import ErrorAlert from '../common/ErrorAlert';
import DeleteModal from './DeleteCategoryModal';


const CategoriesScreen: React.FC = () => {
    const dispatch = useDispatch();
    const error = useSelector(selectError);

    const handleCloseError = () => {
        dispatch(hideError())
    }

    return <div>
        <CategoriesToolbar />
        <CategoriesList />
        <AddEditModal />
        <DeleteModal />
        {error && <ErrorAlert error={error} onClose={handleCloseError} />}
    </div>
}

export default CategoriesScreen;

