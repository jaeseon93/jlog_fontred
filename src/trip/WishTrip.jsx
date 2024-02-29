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
    const [country, setCountry] = useState('');

    const getCountryInfo = async (params) => {
        setCountry(await countryInfo(params));
    }

    return (
        <>
        <Map />
        <Grid sx={{ mt:3, mb:3}}>
            <Divider>국가정보</Divider>
        </Grid>
        <Formik initialValues={initialParams} onSubmit={getCountryInfo}>
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