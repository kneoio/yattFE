import React from 'react';
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const ErrorMessagebox = props => {

    const handleClose = () => {
        props.closeHandler();
    };

    return (
        <Modal
            centered
            show="true"
            onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.message.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    {props.message.title}
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

export default ErrorMessagebox;