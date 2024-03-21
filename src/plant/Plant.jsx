"use client";

import Layout from "../layout/Layout";
import * as React from "react";
import Grid from "@mui/material/Grid";
import {getGardenList} from "./api/PlantApi";
import {useQuery} from "@tanstack/react-query";
import {Button, ImageList, ImageListItem, Pagination} from "@mui/material";
import {useState} from "react";
import {usePlantList} from "./contexts/PlantContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {isEmpty} from "../utils/utils";
import Typography from "@mui/material/Typography";
import PlantDetail from "./PlantDetail";

export default function Plant() {

    const { actions } = usePlantList();
    const [ plantClick, setPlantClick ] = useState(false);
    const [ plantNo, setPlantNo ] = useState(0);

    const [initalParams, setInitalParams ] = useState( {
        pageNo : 1,     // 불러 올 페이지 시작
        numOfRows: 8,   // 한 페이지당 얼만큼 표시할지
        pageNumber: 1,  // 페이지 번호
        pageSize: 10,   // 페이지 사이즈
    });

    const {
        data: gardenList,
    } = useQuery({
        queryKey: ["garden-list", initalParams],
        queryFn: async () => getGardenList(initalParams),
        initialData: [],
    });

    // 페이지 변경
    const handlePageChange = (e, page) => {
        setInitalParams({ ...initalParams , pageNumber: page, pageNo: page});
        actions.getPlantList({...initalParams});
    }

    const handleImageClickBtn = (e) => {
        const plantNo = e.target.alt;
        if(!isEmpty(plantNo)) {
            setPlantClick(true);
            setPlantNo(plantNo);
        }
    }

    return (
        <Layout>
            <Card sx={{ backgroundColor:'#ecf6fd', mt:2}}>
            <CardContent>
                <Grid container justifyContent={"center"}>
                     <Grid item xs={6} >
                         <ImageList sx={{ width: 560, height: 450 }} cols={3}>
                             {
                                 gardenList?.map((element, index) => {
                                 let input;
                                 const sliceIndex = element.rtnThumbFileUrl._cdata.indexOf('|');
                                 input = (
                                     <ImageListItem  key={index}>
                                         <Button
                                             type={"button"}
                                             onClick={handleImageClickBtn}
                                         >
                                         <img
                                             src={element.rtnThumbFileUrl._cdata?.substring(0, sliceIndex)}
                                             alt={element.cntntsNo._cdata}
                                             style={{width:"100%", height:"auto"}}
                                             loading="lazy"
                                         />
                                         </Button>
                                     </ImageListItem>
                                 )
                                 return [input]
                                })
                             }
                         </ImageList>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid sx={{ backgroundColor:"rgba(255,255,255,0.75)", width: 560, height: 450 }}>
                            {
                                plantClick ? (
                                    <PlantDetail plantNo={plantNo} />
                                ) : (
                                    <Typography> 왼쪽 식물을 클릭 해 주세요.</Typography>
                                )
                            }
                        </Grid>
                    </Grid>
                    <Pagination
                     page={initalParams.pageNumber}
                     count={initalParams.pageSize}
                     color="primary"
                     size="large"
                     onChange={handlePageChange}
                    />
                </Grid>
            </CardContent>
            </Card>
        </Layout>
    )
}
