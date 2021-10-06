import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentLocation, removeLocation } from '../../slices/LocationsSlice';
import { selectIsDeleteModalOpen, closeModal } from '../../slices/MetadataSlice';
import ActionModal from '../common/ActionModal';
import { defaultLocation } from './AddEditLocationModal';

const DeleteLocationModal: React.FC = () => {
    const currentLocation = useSelector(selectCurrentLocation);
    const isModalOpen = useSelector(selectIsDeleteModalOpen);
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(removeLocation(currentLocation || defaultLocation))
    }

    const onClose = () => {
        dispatch(closeModal())
    }

    return <ActionModal
        onAction={handleDelete}
        onClose={onClose}
        title={`Delete ${currentLocation?.name} location?`}
        actionName="Delete"
        isModalOpen={isModalOpen}
    />
}

export default DeleteLocationModal;

