import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {reduxForm} from 'redux-form'
import {withRouter} from "react-router";
import {fetchTask, saveTask} from "../../store/task/actions";
import {fetchAssignees} from "../../store/assignees/actions";
import {TaskForm} from "./TaskForm";
import Alert from "react-bootstrap/Alert";
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class TaskDocument extends React.Component {

    state = {
        taskDocument: {},
        value: 1,
        index: 0,
        show: true,
        validationError: {
            description: {
                isError: false,
                message: ""
            }
        }
    }


    componentDidMount() {
        this.props.fetchTask(this.props.match.params.id);
        this.props.fetchAssignees();
    }

    setShow(isShowed) {
        this.setState({
            show: isShowed
        })
    }

    render() {
        // console.log('TaskDocument', this.props)
        let message = '';
        if (this.props.message) {
            if (this.props.message.type === 'VALIDATION_ERROR' && this.state.show) {
                message =
                    <Alert variant="danger" onClose={() => this.setShow(false)} dismissible>
                        <Alert.Heading>Validation error</Alert.Heading>
                        {this.props.message.payloads.exception.errorFields.description.helperText}
                    </Alert>
            } else if (this.props.message.type === 'ERROR') {
                message = <Alert
                    variant="danger"><Alert.Heading>Error!</Alert.Heading>{this.props.message.payloads.exception.message}
                </Alert>
            } else if (this.props.message.type === 'INFO' && this.state.showInfo) {
                setTimeout(function () {
                    this.setState({showInfo: false});
                }.bind(this), 2000);
                message = <Alert variant="success">Saved..</Alert>
            } else if (this.props.message.type === 'SERVER_ERROR') {
                message = <Alert variant="danger"><Alert.Heading>Server error</Alert.Heading>{this.props.title}</Alert>
            }
        }
        const {isNew, actions, statusCode} = this.props
        return (
            <div>
                <TaskForm
                    value="2"
                    allAssignees={this.props.allAssignees}
                    hidden={this.value !== this.index}
                    acl={this.props.acl}
                    pageName={this.props.pageName}
                    isNew={isNew}
                    saveTaskAction={this.props.saveTask}
                    actions={actions}
                    statusCode={statusCode}
                    validationErrors={this.state.validationError}
                    initialValues={this.props.initialValues}
                />
                <Container fluid>
                    <Row className="mt-4">
                        <Col>
                            {message}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

TaskDocument.propTypes = {
    fetchTask: PropTypes.func.isRequired,
    saveTask: PropTypes.func.isRequired,
    fetchAssignees: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    message: state.messageReducer,
    allAssignees: state.assignees.serverPage.payloads.viewpage.result,
    id: state.taskReducer.payloads.task.id,
    statusCode: state.taskReducer.payloads.task.statusCode,
    pageName: state.taskReducer.pageName,
    title: state.taskReducer.title,
    isNew: state.taskReducer.payloads.task.new,
    actions: state.taskReducer.payloads.actions,
    initialValues: {
        typeCode: state.taskReducer.payloads.task.typeCode,
        priorityCode: state.taskReducer.payloads.task.priorityCode,
        deadline: state.taskReducer.payloads.task.deadline,
        assigneeId: state.taskReducer.payloads.task.assigneeId,
        description: state.taskReducer.payloads.task.description
    },
    acl: {
        authorName: state.taskReducer.payloads.task.authorName,
        regDate: state.taskReducer.payloads.task.regDate,
        lastModifiedDate: state.taskReducer.payloads.task.lastModifiedDate,
        lastModifierName: state.taskReducer.payloads.task.lastModifierName,
        rlsEntries: state.taskReducer.payloads.task.acl
    }
});

TaskDocument = reduxForm({
    form: 'task_form',
    enableReinitialize: true
})(TaskDocument);

export default connect(mapStateToProps, {fetchTask, saveTask, fetchAssignees})(withRouter(TaskDocument));




