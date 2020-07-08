import React from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";




export default function Error(props) {

    return (
        <Container>
            <Row>
                <Col>
                    Error
                    <Link to="/home">Home...</Link>
                </Col>
            </Row>
        </Container>
    )
}





