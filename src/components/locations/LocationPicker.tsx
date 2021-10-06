import React from 'react';
import LocationPicker from 'react-location-picker';

type Position = {
  lat: number, lng: number
}

type Props = {
  currentPosition: Position,
  setPosition: (pos: Position) => void
}
const LocationPckr: React.FC<Props> = ({ currentPosition, setPosition }) => {

  const handleLocationChange = (location: any) => {
    setPosition(location.position);
  }

  return (
    <div>
      Choose Location by dragging the marker:
      <div>
        <LocationPicker
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '240px', marginTop: 10 }} />}
          defaultPosition={currentPosition}
          onChange={handleLocationChange}
        />
      </div>
    </div>
  )
}

export default LocationPckr;