import React from 'react';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./../App.css"
import TaskView from "./task/TaskView";
import TaskDocument from "./task/TaskDocument";
import {Profile} from "./Profile";


export const Outline = (props) => {
    let jwtDecode = require('jwt-decode');
    let decoded = jwtDecode(sessionStorage.getItem("jwtToken"));
    const [userName] = React.useState(decoded.sub);

    const logout = event => {
        sessionStorage.removeItem("jwtToken");
        window.location.replace('/sign_in');
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" className="juka-navbar">
                <Navbar.Brand href="/" className="font-weight-bold">JUKA</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/view/tasks">All Tasks</Nav.Link>
                        <Nav.Link href="/view/my_tasks">My tasks</Nav.Link>
                        <NavDropdown title="Actions" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Get stat</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Remind</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Delete</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/profile">{userName}</Nav.Link>
                        <Nav.Link eventKey={2} onClick={logout}>
                            Logout
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {props.match.path === "/view/:viewName" && <TaskView viewType = {props.match.params.viewName}/>}
            {props.match.path === "/document/:id" && <TaskDocument id={props.match.params.id}/>}
            {props.match.path === "/profile" && <Profile/>}
        </div>
    );
}

export default Outline;

