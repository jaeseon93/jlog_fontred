"use client";

import Layout from "../layout/Layout";
import * as React from "react";
import Grid from "@mui/material/Grid";
import getGardenList from "./api/PlantApi";
import {useQuery} from "@tanstack/react-query";
import {ImageList, ImageListItem, Pagination} from "@mui/material";
import {useState} from "react";
import {usePlantList} from "./contexts/PlantContext";

export default function Plant() {

    const {actions} = usePlantList();

    const [initalParams, setInitalParams ] = useState( {
        pageNo : 1,     // 불러 올 페이지 시작
        numOfRows: 8,   // 한 페이지당 얼만큼 표시할지
        pageNumber: 1,  // 페이지 번호
        pageSize: 10,   // 페이지 사이즈
    })
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

    return (
        <Layout>
            <Grid container item xs={12} justifyContent={"center"}>
                 <Grid  sx={{mt:2, textAlign:"center"}}>
                     <ImageList sx={{ width: 550, height: 300 }} cols={4}>
                         {gardenList?.map((url, index) => {
                             let input;
                             input = (
                                 <ImageListItem  key={index}>
                                     <img
                                         src={ url[0]}
                                         alt={'식물'}
                                         style={{width:"100px", height:"100px"}}
                                         loading="lazy"
                                     />
                                 </ImageListItem>
                             )
                             return [input]
                            })
                         }
                     </ImageList>
                     <Pagination
                         page={initalParams.pageNumber}
                         count={initalParams.pageSize}
                         color="primary"
                         size="large"
                         onChange={handlePageChange}
                     />
                </Grid>
            </Grid>
        </Layout>
    )
}
