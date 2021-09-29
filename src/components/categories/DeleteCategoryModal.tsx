import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCategory, removeCategory, selectIsDeleteModalOpen, closeModal } from '../../slices/CategoriesSlice';
import ActionModal from '../common/ActionModal';

const DeleteModal: React.FC = () => {
    const currentCategory = useSelector(selectCurrentCategory);
    const isModalOpen = useSelector(selectIsDeleteModalOpen);
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(removeCategory(currentCategory || ""))
    }

    const onClose = () => {
        dispatch(closeModal())
    }

    return <ActionModal
        onAction={handleDelete}
        onClose={onClose}
        title={`Delete ${currentCategory} category?`}
        actionName="Delete"
        isModalOpen={isModalOpen}
    />
}

export default DeleteModal;

