"use client";

import {useState} from "react";
import Grid from "@mui/material/Grid";
import {Formik} from "formik";
import {Button, MenuItem, Select, TextField} from "@mui/material";
import {countryInfo} from "./api/Trip";
import * as React from "react";
import {GoogleMap, Marker, useJsApiLoader} from "@react-google-maps/api";

const containerStyle = {
    width: '800px',
    height: '350px'
};

const center = {
    lat: 37.5649867,
    lng: 126.985575
};

const OPTIONS = {
    minZoom: 4,
    maxZoom: 18,
}

export default function WishTrip() {
    const initialParams = {
        type: "10",
        countryName: "",
        countryEnName: "",
    }
    const [country, setCountry] = useState('');

    const getCountryInfo = async (params) => {
        setCountry(await countryInfo(params));
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    })
    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, []);

    return (
        <>
        {
            isLoaded ? (
                <Grid container spacing={1} sx={{}}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        options={OPTIONS}
                    >
                        <Marker position={center}></Marker>
                    </GoogleMap>
                </Grid>
            ) : <></>
        }
        <Formik initialValues={initialParams} onSubmit={getCountryInfo}>
            {({ values, errors, touched, handleChange, setFieldValue, handleSubmit, handleReset }) => (
                <form noValidate onSubmit={handleSubmit} onReset={handleReset}>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <Select
                                fullWidth
                                size="small"
                                value={values.type}
                                onChange={handleChange}
                            >
                                <MenuItem value="10">국가명(한국어)</MenuItem>
                                <MenuItem value="20">국가명(영어)</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                type="text"
                                variant="outlined"
                                size="small"
                                name="countryName"
                                value={values.countryName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Button type={"submit"} variant="contained">검색</Button>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
        <Grid>
            <div dangerouslySetInnerHTML={{__html: country}}/>
        </Grid>
        </>
    )

}