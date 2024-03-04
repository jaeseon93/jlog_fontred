import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import 'dayjs/locale/ko';

function Sidebar(props) {
    const { archives, title } = props;

    return (
        <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{textAlign: "center"}}>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ko"}>
                    <DateCalendar defaultValue={dayjs(new Date())} value={dayjs(new Date())} readOnly />
                </LocalizationProvider>
            </Paper>
            <Typography variant="h6" gutterBottom sx={{ mt: 3 , textAlign: "center"}}>
                최근 태그들
            </Typography>
            {archives.map((archive) => (
                <Link display="block" variant="body1" href={archive.url} key={archive.title} sx={{textAlign: "center"}}>
                    {archive.title}
                </Link>
            ))}
        </Grid>
    );
}

Sidebar.propTypes = {
    archives: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }),
    ).isRequired,
    title: PropTypes.string.isRequired,
};

export default Sidebar;