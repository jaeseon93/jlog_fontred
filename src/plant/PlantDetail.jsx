import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {useEffect} from "react";
import {getGardenDtl} from "./api/PlantApi";


export default function PlantDetail ({ plantNo }) {
    // TODO plantNo 로 dtl api 불러오기
    console.log('plantDtl', plantNo)
    useEffect(() => {
        getGardenDtl(plantNo);
    }, [plantNo]);

    return (
        <Grid container>
            <Grid item sx={{ m:2}} >
            <Typography variant="h6" gutterBottom>
                {plantNo}
            </Typography>
            </Grid>
        </Grid>
    )
}