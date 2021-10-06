import React, { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { chooseLocation, clearCurrentLocation, getData, hideError, selectCurrentLocation, selectError, selectLocationsList, filterByCategory } from '../../slices/LocationsSlice';
import ErrorAlert from '../common/ErrorAlert';
import List from '../common/MLList';
import AddEditLocationModal from './AddEditLocationModal';
import DeleteLocationModal from './DeleteLocationModal';
import Button from '../common/MLButton';
import { GridColDef } from '@mui/x-data-grid';
import GoogleMap from '../common/MLGoogleMap';

const LocationsList: React.FC = () => {
    const dispatch = useDispatch();
    const error = useSelector(selectError);
    const currentLocation = useSelector(selectCurrentLocation);
    const [coordinates, setCoordinates] = useState();
    const [openMap, setOpenMap] = useState(false);
    useEffect(() => {
        dispatch(getData());
    }, [dispatch])
    const handleCloseError = () => {
        dispatch(hideError())
    }

    const handleChooseLocation = (row: any) => {
        const { id, ...location } = row;
        dispatch(currentLocation === location ? clearCurrentLocation() : chooseLocation(location))
    }

    const list = useSelector(selectLocationsList);
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'name', width: 350 },
        { field: 'address', headerName: 'address', width: 350, sortable: false },
        { field: 'category', headerName: 'category', width: 350, sortable: false },
        {
            field: "map",
            headerName: "Map",
            sortable: false,
            width: 130,
            renderCell: (params: any) => {
                const onClick = () => {
                    setCoordinates(params.row.coordinates);
                    setOpenMap(true);
                };
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onClick}
                        title="Map"
                    />
                );
            }
        }
    ];
    return <>
        {coordinates &&
            <Modal
                open={openMap}
                onClose={() => setOpenMap(false)} >
                <GoogleMap {...coordinates} />
            </Modal>
        }

        <ErrorAlert error={error} onClose={handleCloseError} />
        <List
            handleSearch={category => dispatch(filterByCategory(category))}
            rows={list.map(item => { return { ...item, id: item.name } })}
            columns={columns}
            handleChooseRow={(item) => {
                handleChooseLocation(item);
            }}
        />
        <AddEditLocationModal />
        <DeleteLocationModal />
    </>
}

export default LocationsList;

