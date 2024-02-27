"use client";

import axios from "axios";
import {Formik} from "formik";
import {Button, Stack, TextField} from "@mui/material";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

export default function AddTrip() {

    const initialParams = {
        country: "",
        city: "",
        airline: "",
        airport: "",
        price: "",
        departureDttm: dayjs(new Date()),
        arriveDttm: dayjs(new Date()),
    }

    const basicUrl = "https://api.odcloud.kr/api"
    axios.get(basicUrl + '/3051589/v1/uddi:ae64c51e-0060-4125-82e6-fe72e10f4112', {
        params: {
            page: 1,
            perPage: 10,
            returnType: JSON,
            serviceKey: process.env.REACT_APP_API_KEY
        }
    }).then((res) => {
            console.log('res', res);
    })

    const handleAddTrip = (values) => {
        console.log('여기!', values)
        axios.post('/api/v1/trip', values)
            .then((res) => {
                console.log('res', res);
            })
    }

    return (
        <Formik initialValues={initialParams} onSubmit={handleAddTrip}>
            {({ values, errors, touched, handleChange, setFieldValue, handleSubmit, handleReset }) => (
                <form noValidate onSubmit={handleSubmit} onReset={handleReset}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                type="text"
                                name="country"
                                variant="standard"
                                size="small"
                                label="나라"
                                value={values.country}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="text"
                                name="city"
                                variant="standard"
                                size="small"
                                label="도시"
                                value={values.city}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="text"
                                name="airline"
                                variant="standard"
                                size="small"
                                label="항공사"
                                value={values.airline}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="text"
                                name="airport"
                                variant="standard"
                                size="small"
                                label="공항"
                                value={values.airport}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="text"
                                name="price"
                                variant="standard"
                                size="small"
                                label="가격"
                                value={values.price}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ko"}>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <DateTimePicker
                                        name="departureDttm"
                                        format={"YYYY-MM-DD HH:mm"}
                                        value={dayjs(values.departureDttm)}
                                        onChange={(newDt) =>
                                            setFieldValue("departureDttm", newDt.format("YYYY-MM-DD HH:mm"))
                                        }
                                        slotProps={{ textField: { size: "small" } }}
                                    />
                                    <Typography textAlign="center">~</Typography>
                                    <DateTimePicker
                                        name="arriveDttm"
                                        value={dayjs(values.arriveDttm)}
                                        format={"YYYY-MM-DD HH:mm"}
                                        onChange={(newDt) =>
                                            setFieldValue("arriveDttm", newDt.format("YYYY-MM-DD HH:mm"))
                                        }
                                        sx={{ ml: 1 }}
                                        slotProps={{ textField: { size: "small" } }}
                                    />
                                </Stack>
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                        <Button type={"submit"} variant="contained">추가</Button>

                </form>
            )}
        </Formik>
    );
}
