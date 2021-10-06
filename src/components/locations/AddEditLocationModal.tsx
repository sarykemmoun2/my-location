import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, DialogContent } from '@mui/material';
import { selectCurrentLocation, addLocation, updateLocation } from '../../slices/LocationsSlice';
import { selectIsModalType, selectIsInputModalOpen, closeModal } from '../../slices/MetadataSlice';

import ActionModal from '../common/ActionModal';
import { LocationType } from '../../APIs/LocationsAPI';
import LocationPicker from './LocationPicker';
import "./style.css"
import CategoriesPicker from '../common/CategoriesPicker';

export const defaultLocation: LocationType = {
    name: "",
    address: "",
    coordinates: {
        lng: 34.8516,
        lat: 31.0461
    },
    category: ""
}
const AddEditLocationModal: React.FC = () => {
    const currentLocation = useSelector(selectCurrentLocation);
    const modalType = useSelector(selectIsModalType);
    const isModalOpen = useSelector(selectIsInputModalOpen);
    const dispatch = useDispatch();
    const [newLocation, setNewLocation] = useState<LocationType>(currentLocation || defaultLocation);
    const onClose = () => {
        setNewLocation(defaultLocation);
        dispatch(closeModal())
    }

    useEffect(() => {
        currentLocation && modalType === "edit" && setNewLocation(currentLocation);
    }, [currentLocation, modalType])

    const handleSave = () => {
        dispatch(modalType === "add" ? addLocation(newLocation) : updateLocation(currentLocation || defaultLocation, newLocation))
    }

    const isMissingField = () => {
        const { name, address, category } = newLocation;
        return name === "" || address === "" || category === "";
    }

    return (
        <ActionModal
            isModalOpen={isModalOpen}
            onAction={handleSave}
            onClose={onClose}
            title={`${modalType} location`}
            content={
                <DialogContent>
                    {["name", "address"].map(field =>
                        <TextField
                            required
                            margin="dense"
                            id={field}
                            label={`Location ${field}`}
                            type="text"
                            fullWidth
                            variant="standard"
                            value={(newLocation as any)[field]}
                            onChange={(e) => {
                                setNewLocation({ ...newLocation, [field]: e.target.value })
                            }}
                        />
                    )}
                    <CategoriesPicker category={newLocation.category} onSelect={(category) =>
                        setNewLocation({ ...newLocation, category })
                    } />
                    <LocationPicker currentPosition={newLocation.coordinates} setPosition={newPos => setNewLocation({ ...newLocation, coordinates: newPos })} />
                </DialogContent>
            }
            disabled={isMissingField()}
            actionName="Save"
        />)
}

export default AddEditLocationModal;