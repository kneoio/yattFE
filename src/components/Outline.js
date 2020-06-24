import React from 'react';

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import "./../App.css"
import {Container} from "react-bootstrap";
import TaskView from "./task/TaskView";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const drawerWidth = 240;


export const Outline = (props) => {
    var jwtDecode = require('jwt-decode');
    var decoded = jwtDecode(sessionStorage.getItem("jwtToken"));
    const [openProfileMenu, setOpenProfileMenu] = React.useState(false);
    const anchorRef = React.useRef(null);

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
        /*        return (
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
                );*/
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" className="juka-navbar">
                <Navbar.Brand href="/">JUKA</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="tasks">All Tasks</Nav.Link>
                        <Nav.Link href="my_tasks">My tasks</Nav.Link>
                        <NavDropdown title="Actions" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Get stat</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Remind</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Delete</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">Profile</Nav.Link>
                        <Nav.Link eventKey={2} href="/sign_in">
                            Logout
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Container fluid>
                <TaskView/>
            </Container>
        </div>
    );
}

export default Outline;

