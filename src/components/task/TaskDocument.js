import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {reduxForm} from 'redux-form'
import {withRouter} from "react-router";
import {fetchTask, saveTask} from "../../store/task/actions";
import {fetchAssignees} from "../../store/assignees/actions";
import 'date-fns';
import Alert from "@material-ui/lab/Alert";
import {TaskForm} from "./TaskForm";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";

class TaskDocument extends React.Component {

    state = {
        taskDocument: {},
        value: 1,
        index: 0,
        alertOpen: true
    }

    constructor(props) {
        super(props);
        this.saveForm = this.saveForm.bind(this);
    }

    componentDidMount() {
        this.props.fetchTask(this.props.match.params.id);
        this.props.fetchAssignees();
    }

    hideAlert() {
        setTimeout(
            this.setState({
                alertOpen: false
        }), 3000);

    }

    saveForm(formData) {
        let id = this.props.id;
        if (id === "new") {
            id = null;
        }
        this.props.saveTask({
            id: id,
            description: formData.description,
            assigneeId: formData.assigneeId,
            deadline: formData.deadline,
            priorityCode: formData.priorityCode,
            statusCode: formData.statusCode,
            typeCode: formData.typeCode
        });
        //this.cancelForm();
    }


    render() {
       // console.log('doc prop', this.props)
        let message = '';
        if (this.props.responseType === 'VALIDATION_ERROR') {
            message = <Alert
                severity="warning"
                style={{marginTop: 15}}>{this.props.title}
            </Alert>
        } else if (this.props.responseType === 'ERROR') {
            message = <Alert
                severity="error"
                style={{marginTop: 15}}>{this.props.title}
            </Alert>
        } else if (this.props.responseType === 'INFO') {
            message = (<Collapse in={this.state.alertOpen}>
                <Alert
                    severity="success"
                    style={{marginTop: 15}}>
                    {this.props.pageName}
                </Alert>
            </Collapse>);
        } else if (this.props.responseType === 'SERVER_ERROR') {
            message = <Alert
                severity="error"
                style={{marginTop: 15}}>{this.props.title}
            </Alert>
        }
        const {handleSubmit, isNew, actions, statusCode} = this.props
        return (
            <div>
                <Grid>
                    <TaskForm
                        value="2"
                        handleSubmitFunction={handleSubmit(this.saveForm)}
                        saveHandler={this.saveForm}
                        allAssignees={this.props.allAssignees}
                        hidden={this.value !== this.index}
                        acl={this.props.acl}
                        pageName={this.props.pageName}
                        isNew={isNew}
                        actions={actions}
                        statusCode={statusCode}
                    />
                </Grid>
                {message}
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
    allAssignees: state.assignees.serverPage,
    responseType: state.taskReducer.serverPage.type,
    statusCode: state.taskReducer.serverPage.payloads.task.statusCode,
    pageName: state.taskReducer.serverPage.pageName,
    title: state.taskReducer.serverPage.title,
    isNew: state.taskReducer.serverPage.payloads.task.new,
    actions: state.taskReducer.serverPage.payloads.actions,
    initialValues: {
        typeCode: state.taskReducer.serverPage.payloads.task.typeCode,
        priorityCode: state.taskReducer.serverPage.payloads.task.priorityCode,
        deadline: state.taskReducer.serverPage.payloads.task.deadline,
        assigneeId: state.taskReducer.serverPage.payloads.task.assigneeId,
        description: state.taskReducer.serverPage.payloads.task.description
    },
    acl: {
        authorName: state.taskReducer.serverPage.payloads.task.authorName,
        regDate: state.taskReducer.serverPage.payloads.task.regDate,
        rlsEntries: state.taskReducer.serverPage.payloads.task.acl
    }

});

TaskDocument = reduxForm({
    form: 'task_form',
    enableReinitialize: true
})(TaskDocument);

export default connect(mapStateToProps, {fetchTask, saveTask, fetchAssignees})(withRouter(TaskDocument));




