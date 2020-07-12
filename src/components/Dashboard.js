import React from 'react';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./../App.css"
import TaskView from "./task/TaskView";
import TaskDocument from "./task/TaskDocument";
import {Profile} from "./Profile";
import UserView from "./user/UserView";
import Container from "react-bootstrap/Container";
import {Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";


export const Dashboard = (props) => {
    let jwtDecode = require('jwt-decode');
    let decoded = jwtDecode(sessionStorage.getItem("jwtToken"));
    const [userName] = React.useState(decoded.sub);

    const logout = () => {
        sessionStorage.removeItem("jwtToken");
        window.location.replace('/sign_in');
    }

    const populateTestData = () => {

    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" className="juka-navbar">
                <Navbar.Brand href="/" className="font-weight-bold">JUKA</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Views" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/view/tasks">Tasks</NavDropdown.Item>
                            <NavDropdown.Item href="/view/my_tasks">My tasks</NavDropdown.Item>
                            <NavDropdown.Item href="/view/users">All Users</NavDropdown.Item>
                            <NavDropdown.Item href="/view/logs">Logs</NavDropdown.Item>
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
            <Container fluid>
                <Row>
                    <Col className="mt-3 mb-2">
                      It will be statistics here
                    </Col>
                </Row>
                <Row>
                    <Col className="mt-3 mb-2">
                        <ButtonGroup>
                            <Button
                                variant="outline-success"
                                as={Link}
                                to={"/document/new"}>
                                Revoke access
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row>
                    <Col className="mt-3 mb-2">
                        <ButtonGroup>
                            <Button
                                variant="outline-danger"
                                onClick={populateTestData}>
                                Populate test data
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Dashboard;

