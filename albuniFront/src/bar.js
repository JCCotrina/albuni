import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { CameraIcon } from "@material-ui/icons/PhotoCamera";
import Typography from "@material-ui/core/Typography";


const bar = (
    <AppBar position="relative">
    <Toolbar>
    <CameraIcon className={classes.icon} />
    <Typography variant="h6" color="inherit" noWrap>
        ALBUNI
    </Typography>
    <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Subir
    </Button>
    </Toolbar>
    </AppBar>
);

export default bar;