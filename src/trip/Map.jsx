"use client";

import {GoogleMap, Marker, useJsApiLoader} from "@react-google-maps/api";
import * as React from "react";

const containerStyle = {
    width: '800px',
    height: '350px'
};

const center = {
    lat: 35.9078,
    lng: 127.7669
};

const options = {
    // minZoom: 1,
    maxZoom: 6,
}

export default function Map () {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    })

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);


    return (
        isLoaded ? (
        <GoogleMap
            center={center}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={options}
            mapContainerStyle={containerStyle}
        >
            <Marker position={center}></Marker>
        </GoogleMap>
        ) : <></>
    )
}