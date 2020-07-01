import {Container} from "react-bootstrap";
import {Formik} from "formik";
import {Datepicker, Form, Select, Textarea} from "react-formik-ui";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as React from "react";
import * as Yup from "yup";

const types = [
    {label: "UNKNOWN", value: "0"},
    {label: "DEVELOPING", value: "21"},
    {label: "TESTING", value: "22"},
    {label: "DOCUMENT", value: "23"}
];

const priorities = [
    {label: "UNKNOWN", value: "0"},
    {label: "LOW", value: "11"},
    {label: "MIDDLE", value: "12"},
    {label: "HIGH", value: "13"},
    {label: "URGENT", value: "14"}
];

export const Tab1 = (props) => {

    const initVals = {
        priorityCode: props.initVals.priorityCode,
        typeCode: props.initVals.typeCode,
        deadline: props.initVals.deadline,
        assigneeId: props.initVals.assigneeId,
        description: props.initVals.description
    }

    const validationSchema = Yup.object().shape({
        description: Yup.string()
            .required('Description is required'),
        deadline: Yup.date()
            .required('Deadline is required')
    });

    const handleSubmit = (values, actions) => {
        alert(JSON.stringify(values, null, 2));
        let id = values.id;
        if (id === "new") {
            id = null;
        }
        props.saveTaskAction({
            id: id,
            description: values.description,
            assigneeId: values.assigneeId,
            deadline: values.deadline,
            priorityCode: values.priorityCode,
            statusCode: values.statusCode,
            typeCode: values.typeCode
        });
        //this.cancelForm();
    }

    return (<div index={1}>
            <Container fluid>
                <Formik innerRef={props.formRef}
                        enableReinitialize
                        initialValues={initVals}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}>
                    <Form>
                        <Row className="mt-4">
                            <Col sm={2} className="text-right">Type</Col>
                            <Col sm={3}>
                                <Select
                                    className="form-control"
                                    name="typeCode"
                                    options={types}>
                                </Select>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col sm={2} className="text-right">Priority</Col>
                            <Col sm={3}>
                                <Select
                                    className="form-control"
                                    name="priorityCode"
                                    options={priorities}>
                                </Select>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col sm={2} className="text-right">Deadline</Col>
                            <Col sm={3}>
                                <Datepicker
                                    className="form-control"
                                    name="deadline"
                                    dateFormat='dd.MM.yyyy'
                                    placeholder='dd.mm.yyyy'
                                />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col sm={2} className="text-right">Assignee</Col>
                            <Col sm={3}>
                                <Select
                                    className="form-control"
                                    name="assigneeId"
                                    options={props.allAssignees}>
                                </Select>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col sm={2} className="text-right">Description</Col>
                            <Col sm={10}>
                                <Textarea
                                    className="form-control"
                                    rows="10"
                                    name="description">
                                </Textarea>
                            </Col>
                        </Row>
                    </Form>
                </Formik>
            </Container>
        </div>
    )
}