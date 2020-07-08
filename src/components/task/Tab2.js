import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import {AiFillCheckCircle} from "react-icons/all";
import * as React from "react";


export const Tab2 = (props) => {
    console.log("acl", props.acl)
    return (<div index={2}>
        <Container fluid>
            <Row className="mt-4">
                <Col sm={2} className="text-right">
                    Author
                </Col>
                <Col>
                    {props.acl.authorName}
                </Col>
            </Row>
            <Row className="mt-2">
                <Col sm={2} className="text-right">
                    Created
                </Col>
                <Col>
                    {props.acl.regDate}
                </Col>
            </Row>
            <Row className="mt-2">
                <Col sm={2} className="text-right">
                    Last modification
                </Col>
                <Col>
                    {props.acl.lastModifiedDate}
                </Col>
            </Row>
            <Row className="mt-2">
                <Col sm={2} className="text-right">
                    Last modifier
                </Col>
                <Col>
                    {props.acl.lastModifierName}
                </Col>
            </Row>
            <Row className="mt-4">
                <Col sm={2} className="text-right">
                    Access table
                </Col>
                <Col sm={7} offset={3}>
                    <Table striped bordered hover>
                        <thead className="thead-light">
                        <tr>
                            <th width="150">User</th>
                            <th width="20">Can read</th>
                            <th width="50">Was read</th>
                            <th width="20">Can edit</th>
                            <th width="20">Can delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.acl.rlsEntries && props.acl.rlsEntries.map(row => (
                            <tr key={row.readerName}>
                                <td>{row.readerName}</td>
                                <td className="text-center"><AiFillCheckCircle color="green"/></td>
                                <td>{row.readingTime}</td>
                                <td className="text-center">{(row.accessLevel === 1 || row.accessLevel === 2) &&
                                <AiFillCheckCircle color="green"/>}</td>
                                <td className="text-center">{row.accessLevel === 3 &&
                                <AiFillCheckCircle color="red"/>}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    </div>)
}