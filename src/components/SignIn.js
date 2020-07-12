import React, {useState} from 'react';
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

const SignIn = props => {

    const [showMsg, setShowMsg] = useState(true);

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
