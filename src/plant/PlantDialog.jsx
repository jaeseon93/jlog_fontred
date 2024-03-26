"use client";

import {Dialog, DialogContent, DialogTitle, ImageList, ImageListItem, styled} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {useEffect, useState} from "react";
import {plantFileList} from "./api/PlantApi";

export default function PlantDialog ({ open , setOpen, plantNo }) {

    const [ fileList , setFileList ] = useState([]);

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

    console.log('fileList', fileList.length);

    useEffect(() => {
        plantFileList(plantNo).then( (list) => {
            setFileList(list);
        })
    }, [plantNo]);
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Dialog
            open={open}
            scroll={"paper"}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    사진 더보기
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <ImageList sx={{ width: "100%", height: "auto" }} cols={2}>
                        {
                            fileList?.length >= 2 ? fileList.map((element, index) => {
                                const input = (
                                    <ImageListItem key={index}>
                                        <img
                                            src={element.rtnFileUrl._cdata}
                                            alt={element.cntntsNo._cdata}
                                            loading="lazy"
                                            style={{ width:"100%", height:"auto"}}
                                        />
                                    </ImageListItem>
                                )
                                return [input]
                            }) : (
                                <img
                                    src={fileList.rtnFileUrl?._cdata}
                                    alt={fileList.cntntsNo?._cdata}
                                    loading="lazy"
                                    style={{ width:"100%", height:"auto"}}
                                />
                            )
                        }
                    </ImageList>
                </DialogContent>
            </BootstrapDialog>
        </Dialog>
    )
}