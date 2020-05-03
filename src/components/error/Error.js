import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

import Grid from "@material-ui/core/Grid";
import {textAlign} from "@material-ui/system";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 500,
    },
});

export default function Error(props) {
    const classes = useStyles();
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Yatt
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Grid>
                <Grid item xs={2}/>
                <Grid item xs={9}>
                    <Typography variant="h2" align="left">
                        Error
                    </Typography>
                </Grid>
                <Grid item xs={1}/>
                <Grid item xs={2}/>
                <Grid item xs={9} >
                    <Typography variant="h7" align="left">
                        {props.match.params.message}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}





