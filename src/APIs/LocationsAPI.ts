
export type LocationType = {
    name: string;
    address: string;
    coordinates: {
        lng: number;
        lat: number;
    }
    category: string;
}
const getLocationIndex = (locations: LocationType[], locationName: string): number => {
    const locationIndex = locations.findIndex(item => item.name === locationName);
    if (locationIndex === -1) {
        throw new Error("Shouldn't happen");
    }
    return locationIndex;
};

const setLocations = (locations: LocationType[]) => {
    localStorage.setItem("locations", JSON.stringify(locations));
};

const locationAlreadyExists = (newName: string): boolean => {
    const locations = getLocations();
    return locations.findIndex(item => item.name === newName) !== -1;
}

export const getLocations = (): LocationType[] => {
    return JSON.parse(localStorage.getItem("locations") || "[]");
};

export const updateLocationAPI = (oldLocation: LocationType, newLocation: LocationType) => {
    if (locationAlreadyExists(newLocation.name) && oldLocation.name !== newLocation.name) {
        return false;
    }
    const oldLocations = getLocations();
    const locationIndex = getLocationIndex(oldLocations, oldLocation.name);
    oldLocations[locationIndex] = newLocation;
    setLocations(oldLocations);
    return true;
};

export const addLocationAPI = (location: LocationType): boolean => {
    const oldLocations = getLocations();
    if (locationAlreadyExists(location.name)) {
        return false;
    }
    oldLocations.push(location);
    setLocations(oldLocations);
    return true;
};

export const deleteLocationAPI = (location: LocationType) => {
    const oldLocations = getLocations();
    const locationIndex = getLocationIndex(oldLocations, location.name);
    oldLocations.splice(locationIndex, 1);
    setLocations(oldLocations);
};
