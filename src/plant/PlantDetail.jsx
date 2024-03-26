import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Fragment, useEffect, useRef, useState} from "react";
import {getGardenDtl} from "./api/PlantApi";
import {Button, Chip, Stack } from "@mui/material";
import PlantDialog from "./PlantDialog";


export default function PlantDetail ({ plantNo }) {

    const [ dtlInfo, setDtlInfo ] = useState({});

    const [open, setOpen] = useState(false);
    const descriptionElementRef = useRef(null);

    useEffect(() => {
        getGardenDtl(plantNo).then((dtlInfo) => {
            setDtlInfo(dtlInfo);
            console.log('dtlInfo', dtlInfo);
        });
    }, [plantNo]);

    const handleMorePics = () => {
        setOpen(true);
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }

    return (
        <Fragment>
            <PlantDialog open={open} setOpen={setOpen} plantNo={plantNo} />
            <Grid item sx={{ m:2}} >
                {
                    dtlInfo?
                    <Grid>
                        <Stack direction="row" spacing={1} >
                            <Chip label={dtlInfo.fmlCodeNm?._cdata} variant="outlined" size="small" />
                            <Chip label={dtlInfo.managelevelCodeNm?._cdata} variant="outlined" size="small" />
                            <Chip label={dtlInfo.orgplceInfo?._cdata} variant="outlined" size="small" />
                        </Stack>
                        <Grid container spacing={1} sx={{my:2}}>
                            <Grid item xs={9}>
                                <Chip label={dtlInfo.distbNm?._cdata? dtlInfo.distbNm?._cdata : '정보없음'} color="success" />
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    type="button"
                                    onClick={handleMorePics}
                                >사진 더보기</Button>
                            </Grid>
                        </Grid>
                        <Grid  container spacing={1}>
                            <Fragment>
                                <Grid item xs={2}>
                                    <Typography variant="subtitle2" gutterBottom>습도 :</Typography>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant="subtitle2" gutterBottom>{dtlInfo.hdCodeNm?._cdata}</Typography>
                                </Grid>
                                
                                <Grid item xs={2}>
                                    <Typography variant="subtitle2" gutterBottom>잎무늬 :</Typography>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant="subtitle2" gutterBottom>{dtlInfo.lefmrkCodeNm?._cdata}</Typography>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant="subtitle2" gutterBottom>생장속도:</Typography>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant="subtitle2" gutterBottom>{dtlInfo.grwtveCodeNm?._cdata}</Typography>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant="subtitle2" gutterBottom>독성정보 :</Typography>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant="subtitle2" gutterBottom>{dtlInfo.toxctyInfo?._cdata}</Typography>
                                </Grid>
                                
                                <Grid item xs={2}>
                                    <Typography variant="subtitle2" gutterBottom>비료 정보:</Typography>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant="subtitle2" gutterBottom>{dtlInfo.frtlzrInfo?._cdata}</Typography>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant="subtitle2" gutterBottom>기능성 정보:</Typography>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant="subtitle2" gutterBottom>{dtlInfo.fncltyInfo?._cdata}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="subtitle2" gutterBottom>조언:</Typography>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant="subtitle2" gutterBottom>{dtlInfo.adviseInfo?._cdata}</Typography>
                                </Grid>
                            </Fragment>
                        </Grid>
                    </Grid>
                        : <Typography variant="h6" gutterBottom>식물 정보를 불러올 수 없습니다.</Typography>
                }
            </Grid>
        </Fragment>
    )
}