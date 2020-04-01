import * as React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {Ballot} from "@material-ui/icons";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {Paper} from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import CssBaseline from "@material-ui/core/CssBaseline";

class Outline extends React.Component {
    constructor(props) {
        super(props);
        let drawerWidth = 240;

        this.useStyles = {
            drawer: {
                width: drawerWidth,
                flexShrink: 0,
                paper: {
                    width :drawerWidth,
                    elevation20: true
                }
            },
            appBar: {},
            appBarShift: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth
            },
            drawerPaper: {
                width: drawerWidth
            },
            content: {
                flexGrow: 1,
                marginLeft: -drawerWidth
            },
            contentShift: {
                marginLeft: 0
            },
        };
        this.state = {
            open: true,
            appBarStyle: this.useStyles.appBarShift,
            contentStyle: this.useStyles.contentShift
        };
        this.render = this.render.bind(this);
    }

    handleDrawerOpen = () => {
        this.setState({open: true});
        this.setState({appBarStyle: this.useStyles.appBarShift});
        this.setState({contentStyle: this.useStyles.contentShift});
    };

    handleDrawerClose = () => {
        console.log("close");
        this.setState({open: false});
        this.setState({appBarStyle: this.useStyles.appBar});
        this.setState({contentStyle: this.useStyles.content});
    };

    render() {
        //const theme = useTheme();
        return <div style={{display: 'flex'}}>
            <CssBaseline />
            <AppBar
                position="fixed"
                style={this.state.appBarStyle}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={this.handleDrawerOpen}
                        edge="start"
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Persistent drawer
                    </Typography>
                </Toolbar>
            </AppBar>
                <Drawer
                    variant="persistent"
                    anchor="left"
                    open={this.state.open}
                    style={this.useStyles.drawer}
                >
                    <div>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <List>
                        <ListItem button key="All tasks">
                            <ListItemIcon><Ballot/></ListItemIcon>
                            <ListItemText primary="All tasks"/>
                        </ListItem>
                    </List>
                </Drawer>

            <main
                style={this.state.contentStyle}
            >
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                    facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                    gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                    donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                    Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                    imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                    arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                    donec massa sapien faucibus et molestie ac.
                </Typography>
            </main>
        </div>;
    }

}

export default Outline;