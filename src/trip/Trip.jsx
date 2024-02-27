"use client";

import {Component} from "react";
import {Tab, Tabs} from "@mui/material";
import Layout from "../layout/Layout";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AddTrip from "./AddTrip";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import WishTrip from "./WishTrip";

export default function Trip() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        console.log('newValue', newValue);
        setValue(newValue);
    };

    return (
        <Layout>
            <Card sx={{ mt:3}}>
                <CardContent sx={{minHeight: "400px"}}>
                    <Tabs value={value} onChange={handleChange} sx={{ mt:2 }}>
                        <Tab label="여행일정" value={0}/>
                        <Tab label="여행계획" value={1} />
                        <Tab label="가보고싶은나라" value={2} />
                    </Tabs>
                    <Grid>
                        <TabPanel value={value} index={0} >0</TabPanel>
                        <TabPanel value={value} index={1}>
                            <AddTrip />
                        </TabPanel>
                        <TabPanel value={value} index={2} >
                            <WishTrip />
                        </TabPanel>
                    </Grid>
                </CardContent>
            </Card>
        </Layout>
    );
}
class TabPanel extends Component {
    render() {
        return (
            <Typography component="div" hidden={this.props.value !== this.props.index}>
                <Box p={3}>{this.props.children}</Box>
            </Typography>
        );
    }
}
