import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";


export default function PlantDtail ({ plantNo }) {
    // TODO plantNo 로 dtl api 불러오기
    console.log('plantDtl', plantNo)

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