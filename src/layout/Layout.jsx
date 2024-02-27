"use client";

import {Fragment} from "react";
import Header from "./Header";
import {Container} from "@mui/material";
import Footer from "./Footer";

export default function Layout(props) {

    return (
        <Fragment>
            <Header />
            <Container maxWidth="lg" sx={{minHeight: "700px"}}>
                {props.children}
            </Container>
            <Footer />
        </Fragment>
    )
}