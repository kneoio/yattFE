import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {login} from "../store/security/actions";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {useFormik} from "formik";
import Alert from "react-bootstrap/Alert";
import Nav from "react-bootstrap/Nav";
import axios from "axios";

const SignIn = props => {

    const formik = useFormik({
        initialValues: {
            user: "",
            password: ""
        },
        onSubmit: values => {
            props.login(values.user, values.password);
        },
    });

    const messageType = props.security.type;

    const updateLang = (lang) => {
        const connectSession = axios.create({
            withCredentials: false,
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        });
        let URL = process.env.REACT_APP_REST_HOST + '/home/' + lang;
        connectSession.get(URL)
            .then(response => {
                let data = response.data;
                this.setState({
                    lang: data.lang,
                    name: data.name,
                    motto: data.motto,
                    subMotto: data.subMotto,
                    menuHome: data.menuHome,
                    menuTasks: data.menuTasks
                });
            }).catch(error => {
            console.log('update lang', error);
        });
    }

    return (
        <Container>
            <Row style={{height: 30}}>
            </Row>
            <Form onSubmit={formik.handleSubmit}>
                <Row className="justify-content-center">
                    <Col className="col-md-4">

                        <Form.Group controlId="user">
                            <Form.Label>Login name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter login"
                                onChange={formik.handleChange}
                                value={formik.values.user}
                            />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="col-md-4 text-center">
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Row className="justify-content-center align-items-center" style={{height: 200}}>
                <Col className="col-md-4 text-center">
                    <img
                        src={`${process.env.PUBLIC_URL}/images/juka_logo.png`}
                        alt="logo"/>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col className="col-md-4">
                    {messageType === 'LOGIN_FAIL' && <Alert variant="danger">
                        <Alert.Heading>Error!</Alert.Heading>{props.security.title}</Alert>}
                </Col>
            </Row>
            <div className="footer">
                <p>{process.env.REACT_APP_JUKA_VERSION}</p>
            </div>
            <footer className="mt-auto">
                <div index={1}>
                    <Container fluid>
                        <Nav activeKey="/home">
                            <Nav.Item>
                                {<Nav.Link onClick={() => updateLang('en')}>en</Nav.Link>}
                            </Nav.Item>
                            <Nav.Item>
                                {<Nav.Link onClick={() => updateLang('ru')}>ru</Nav.Link>}
                            </Nav.Item>
                            <Nav.Item>
                                {<Nav.Link onClick={() => updateLang('pt')}>pt</Nav.Link>}
                            </Nav.Item>
                        </Nav>
                    </Container>
                </div>
            </footer>
        </Container>

    )

}

SignIn.propTypes = {
    login: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    security: state.security.serverPage
});


export default connect(mapStateToProps, {login})(SignIn);
