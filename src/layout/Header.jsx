import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {useNavigate} from "react-router-dom";
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {Fragment} from "react";

function Header() {

    const menus = [
        { title: 'Home', name: 'home' },
        { title: 'AboutMe', name: 'aboutMe' },
        { title: 'Plant', name: 'plant' },
        { title: 'Book', name: 'book' },
        { title: 'Wish', name: 'wish' },
        { title: 'Travel', name: 'travel' },
    ];

    const defaultTheme = createTheme();
    const navigate = useNavigate();

    const handleClick = (name) => {
        console.log('name', name);
        switch (name) {
            case 'travel' :
                navigate("/trip");
                break;
            case 'home' :
                navigate("/"); break;
            default :
                navigate("/"); break;
        }
    }

    return (
        <Fragment>
            <Container maxWidth="lg">
                <ThemeProvider theme={defaultTheme}>
                    <CssBaseline />
                    <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Typography
                            component="h2"
                            variant="h5"
                            color="inherit"
                            align="center"
                            noWrap
                            sx={{ flex: 1 }}
                        >
                            JLog
                        </Typography>
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </Toolbar>
                    <Toolbar
                        component="nav"
                        variant="dense"
                        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
                    >
                        {menus.map((section) => (
                            <Link
                                color="inherit"
                                noWrap
                                key={section.title}
                                variant="body2"
                                onClick={() => handleClick(section.name)}
                                sx={{ p: 1, flexShrink: 0 }}
                            >
                                {section.title}
                            </Link>
                        ))}
                    </Toolbar>
                </ThemeProvider>
            </Container>
        </Fragment>
    );
}

export default Header;