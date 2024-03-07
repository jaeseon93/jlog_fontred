"use client";

import {useState} from "react";
import Grid from "@mui/material/Grid";
import {Formik} from "formik";
import {Button, MenuItem, Select, TextField} from "@mui/material";
import {countryInfo} from "./api/Trip";
import * as React from "react";
import Map from "./Map";
import Divider from "@mui/material/Divider";

export default function WishTrip() {
    const initialParams = {
        type: "10",
        countryName: "",
        countryEnName: "",
    }
    const [country, setCountry] = useState({countryName:'' , continent: '', basic:'', imgUrl:''});
    const getCountryInfo = async (params) => {
        setCountry(await countryInfo(params));
    }

    const handleCountryInfoReset = () => {
        setCountry({countryName:'' , continent: '', basic:'', imgUrl:'' });
        console.log('country', country);
    }

    return (
        <>
            <Map />
            <Grid sx={{ mt:3, mb:3}}>
                <Divider>국가정보</Divider>
            </Grid>
            <Formik initialValues={initialParams}
                    onSubmit={getCountryInfo}
                    onReset={handleCountryInfoReset}
            >
                {({ values, errors, touched, handleChange, setFieldValue, handleSubmit, handleReset }) => (
                    <form noValidate onSubmit={handleSubmit} onReset={handleReset}>
                        <Grid container spacing={1} sx={{mt:1}}>
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
                                <Button type={"submit"} variant="contained" sx={{mr:1}}>검색</Button>
                                <Button type={"reset"} variant="outlined">초기화</Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <img src={country.imgUrl ? country.imgUrl : ''}
                         alt={'국가이미지'}
                    />
                    <div dangerouslySetInnerHTML={{__html: country.countryName? country.countryName + '[' + country.continent + ']' : ''}}/>
                </Grid>
                <Grid item xs={10}>
                    <div dangerouslySetInnerHTML={{__html: country.basic}}/>
                </Grid>
            </Grid>
        </>
    )

}