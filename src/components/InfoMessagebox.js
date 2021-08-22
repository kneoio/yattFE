import React from 'react';
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import {Badge, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const levels = [];
levels[0] = <Badge>UNKNOWN</Badge>;
levels[1] = <Badge style={{backgroundColor: "#a1a199", width: 95}}>DRAFT</Badge>;
levels[2] = <Badge style={{backgroundColor: "#96bf8c", width: 95}}>IN PROGRESS</Badge>;

const InfoMessagebox = props => {

    const handleClose = () => {
        props.closeHandler();
    };

    let rows = props.message.payloads.entries;

    return (
        <Modal
            show="true"
            onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.message.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    {rows.map(row => {
                        return <Row key={row.id}><Col sm={"3"}>{row.level}</Col><Col>{row.description}</Col></Row>;
                    })}
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default InfoMessagebox;