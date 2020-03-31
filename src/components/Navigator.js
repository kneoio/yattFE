import React, {Component} from 'react';
import {ListItemIcon, ListItemText, Divider, IconButton, MenuList, MenuItem, Drawer} from '@material-ui/core';
import {Link, withRouter} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import routes from './Routes';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";


export class Navigator extends Component {
    constructor(props) {
        super(props);
        const drawerWidth = 240;

        this.classes = makeStyles((theme) => ({
            root: {
                display: 'flex',
            },
            appBar: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
            drawer: {
                width: drawerWidth,
                flexShrink: 0,
            },
            drawerPaper: {
                width: drawerWidth,
            },
            // necessary for content to be below app bar
            toolbar: theme.mixins.toolbar,
            content: {
                flexGrow: 1,
                backgroundColor: theme.palette.background.default,
                padding: theme.spacing(3),
            },
        }));
        this.activeRoute = this.activeRoute.bind(this);
    }

    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
    }

    render() {
        return (
            <div className={this.classes.root}>
                {/*<CssBaseline/>
                <AppBar position="fixed" className={this.classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Permanent drawer
                        </Typography>
                    </Toolbar>
                </AppBar>*/}
                <Drawer variant="permanent"
                        className={this.classes.drawer}
                        classes={{
                            paper: this.classes.drawerPaper,
                        }}
                        anchor="left">
                    <div className={this.classes.toolbar} />
                    <Divider/>
                    <List>
                        {routes.map((prop, key) => {
                            return (
                                <Link to={prop.path} style={{textDecoration: 'none'}} key={key}>
                                    <MenuItem selected={this.activeRoute(prop.path)}>
                                        <ListItemIcon>
                                            <prop.icon/>
                                        </ListItemIcon>
                                        <ListItemText primary={prop.sidebarName}/>
                                    </MenuItem>
                                </Link>
                            );
                        })}
                    </List>
                </Drawer>
            </div>
        );
    }
}

export default withRouter(Navigator);