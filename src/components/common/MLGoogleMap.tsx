import React from 'react';
import { compose, withProps } from "recompose"
import { withGoogleMap, GoogleMap, Marker, withScriptjs } from "react-google-maps"

const GooglMap: React.FC<{ lat: number, lng: number }> = ({ lat, lng, ...props }) => {

    const MyMapComponent = compose(
        withProps({
            googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
            loadingElement: <div style={{ height: `100%` }} />,
            containerElement: <div style={{ height: `400px` }} />,
            mapElement: <div style={{ height: `100%` }} />,
            apiKey: 'AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8'
        }),
        withScriptjs,
        withGoogleMap
    )(() =>
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat, lng }}
        >
            {<Marker position={{ lat, lng }} onClick={(e: any) => {
            }} />}
        </GoogleMap>
    )
    return <MyMapComponent />
}

export default GooglMap;