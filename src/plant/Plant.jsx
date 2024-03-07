import Layout from "../layout/Layout";
import {getPlantLights} from "./api/Plant";
import {useEffect, useState} from "react";

export default function Plant() {

    const [lights, setLights] = useState([]);

    useEffect( () => {
        setLights(getPlantLights);
    }, []);

    console.log('lights', lights);
    return (
        <Layout>

        </Layout>
    )
}