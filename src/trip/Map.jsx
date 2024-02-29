"use client";

import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
import * as React from "react";
import {Fragment} from "react";
import Grid from "@mui/material/Grid";

const containerStyle = {
    width: '800px',
    height: '350px'
};

const inputStyle= {
    boxShadow: 'inset 0 0 10px #eee !important',
    border: '2px solid #eee',
    width: '456px',
    height: '40px',
    marginLeft: '16px',
    borderRadius: '20px',
    fontWeight: '300 !important',
    outline: 'none',
    padding: '10px 20px',
    marginBottom: '10px',
}

const libraries = ["places"];

const options = {
    disableDefaultUI: true,
    zoomControl: true
};
const center = {
    lat: 37.532600,
    lng: 127.024612
};

export default function Map () {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    });
    console.log('isLoaded', isLoaded);
    const mapRef = React.useRef();
    const inputRef = React.useRef();

    const onMapLoad = React.useCallback(map => {
        mapRef.current = map;
    }, []);

    const autoComplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
    )

    autoComplete.addListener('place_changed', () => {
        let map = mapRef.current;
        const place = autoComplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
            alert("현재 이용할 수 없는 지역입니다. 다시 검색해주세요.");
        }
        if (place.geometry.viewport || place.geometry.location) {
            mapRef.current.panTo({ lat: place.geometry.location.lat(), lng:place.geometry.location.lng() });
            new window.google.maps.Marker({position: place.geometry.location, map});
        }
    })

    return (
        isLoaded ? (
        <Grid>
         <label>Location</label>
         <input
             placeholder='type your location'
             ref={inputRef}
             style={inputStyle}
            />
            <GoogleMap
                id="map"
                mapContainerStyle={containerStyle}
                zoom={12}
                center={center}
                options={options}
                onLoad={onMapLoad}
            >
                <Marker position={center}></Marker>
            </GoogleMap>
        </Grid>
        ) : <></>
    )
}