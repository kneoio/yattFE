import React from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TaskView from "./task/TaskView";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import {Link} from "react-router-dom";
import TaskDocument from "./task/TaskDocument";
import PeopleIcon from '@material-ui/icons/People';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(1),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export const Outline = (props) => {
    var jwtDecode = require('jwt-decode');
    var decoded = jwtDecode(sessionStorage.getItem("jwtToken"));
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [openProfileMenu, setOpenProfileMenu] = React.useState(false);
    const [userName] = React.useState(decoded.sub);
    const anchorRef = React.useRef(null);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    const handleProfileMenuToggle = () => {
        setOpenProfileMenu((prevOpen) => !prevOpen);
    };

    const handleProfileMenuClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpenProfileMenu(false);
    };

    const handleProfileMenuListKeyDown = event => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpenProfileMenu(false);
        }
    }

    const logout = event => {
        sessionStorage.removeItem("jwtToken");
        window.location.replace('/sign_in');
        setOpenProfileMenu(false);
    }

    const prevOpen = React.useRef(openProfileMenu);
    React.useEffect(() => {
        if (prevOpen.current === true && openProfileMenu === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = openProfileMenu;
    }, [openProfileMenu]);

    const ProfileMenu = props => {
        return (
            <div>
                <Popper open={openProfileMenu} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({TransitionProps, placement}) => (
                        <Grow
                            {...TransitionProps}
                            style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleProfileMenuClose}>
                                    <MenuList autoFocusItem={openProfileMenu} id="menu-list-grow"
                                              onKeyDown={handleProfileMenuListKeyDown}>
                                        <MenuItem component={Link} to="/my_account">My account</MenuItem>
                                        <MenuItem onClick={logout}>Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <AppBar
                style={{background: "#169ccc"}}
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        JUKA
                    </Typography>
                    <Button
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleProfileMenuToggle}
                        color="inherit">
                        <PersonIcon style={{marginRight: 10}}/>{userName}
                    </Button>
                    <ProfileMenu/>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <ListItem button key={'Created by me'} component={Link} to={"/view/my_tasks"}>
                        <ListItemIcon><FormatListBulletedIcon/></ListItemIcon>
                        <ListItemText primary={'Created by me'}/>
                    </ListItem>
                    {['All tasks'].map((text, index) => (
                        <ListItem button key={text} component={Link} to={"/view/tasks"}>
                            <ListItemIcon><FormatListBulletedIcon/></ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {['Users'].map((text, index) => (
                        <ListItem button key={text} component={Link} to={"/view/users"}>
                            <ListItemIcon><PeopleIcon/></ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader}/>
                {props.match.path === "/view/:viewName" && props.match.params.viewName === "tasks" && <TaskView/>}
                {props.match.path === "/document/:id" && <TaskDocument id={props.match.params.id}/>}
            </main>
        </div>
    );
}

export default Outline;

