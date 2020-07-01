import * as React from 'react';
import {ActionBar} from "../ActionBar";
import {Badge, Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {Tab2} from "./Tab2";
import {Tab1} from "./Tab1";

const statuses = [];
statuses[0] = <Badge>UNKNOWN</Badge>;
statuses[1] = <Badge style={{backgroundColor: "#a1a199", width: 100}}>DRAFT</Badge>;
statuses[2] = <Badge style={{backgroundColor: "#96bf8c", width: 100}}>IN PROGRESS</Badge>;
statuses[3] = <Badge style={{backgroundColor: "#9eb7de", width: 100}}>DONE</Badge>;
statuses[4] = <Badge style={{backgroundColor: "#e8e15c", width: 100}}>SUSPEND</Badge>;

export const TaskForm = (props) => {

    const formReference = React.createRef();
    const [tabValue, setTabValue] = React.useState("propertiesTab");

    return (
        <Container fluid>
            <Row>
                <Col className="mt-3 mb-2">
                    <ActionBar formRef={formReference} actions={props.actions}/>
                </Col>
                <Col className="mt-3 mb-2 text-right">
                    {statuses[props.statusCode]}
                </Col>
                <Col className="mt-3 mb-2 text-right">
                    {props.pageName}
                </Col>
            </Row>
            <Row>
                <Col className="mt-3">
                    <Tabs activeKey={tabValue}
                          onSelect={(k) => setTabValue(k)}>
                        <Tab eventKey="propertiesTab" title="Properties">
                            <Tab1
                                formRef={formReference}
                                saveTaskAction={props.saveTaskAction}
                                initVals={props.initialValues}
                                allAssignees={props.allAssignees}/>
                        </Tab>
                        <Tab eventKey="aclTab" title="ACL">
                            <Tab2 acl={props.acl}/>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    );
}
