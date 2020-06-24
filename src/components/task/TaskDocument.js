import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {reduxForm} from 'redux-form'
import {withRouter} from "react-router";
import {fetchTask, saveTask} from "../../store/task/actions";
import {fetchAssignees} from "../../store/assignees/actions";
import 'date-fns';

class TaskDocument extends React.Component {

    state = {
        taskDocument: {},
        value: 1,
        index: 0,
        showInfo: true,
        validationError: {
            description: {
                isError: false,
                message: ""
            }
        }
    }

    constructor(props) {
        super(props);
        this.saveForm = this.saveForm.bind(this);
    }

    componentDidMount() {
        this.props.fetchTask(this.props.match.params.id);
        this.props.fetchAssignees();
    }

    static getDerivedStateFromProps(props, state) {
        console.log("props message", props.message);
        if (props.message && props.message.type === 'VALIDATION_ERROR') {
            return {
                validationError: {
                    description: {
                        isError: true,
                        message: props.message.payloads.exception.errorFields.description.helperText
                    }
                }
            }
        } else {
            return {
                validationError: {
                    description: {
                        isError: false,
                        message: ""
                    }
                }
            }
        }
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
        //console.log('doc prop', this.props)
        let message = '';
        if (this.props.message) {
            if (this.props.message.type === 'VALIDATION_ERROR') {
/*                message = <Alert
                    severity="warning"
                    style={{
                        marginTop: 15,
                        marginRight: 300
                    }}>{this.props.message.payloads.exception.errorFields.description.helperText}}

                </Alert>*/
            } else if (this.props.message.type === 'ERROR') {
                /*message = <Alert
                    severity="error"
                    style={{marginTop: 15, marginRight: 300}}>{this.props.message.payloads.exception.message}
                </Alert>*/
            } else if (this.props.message.type === 'INFO' && this.state.showInfo) {
                setTimeout(function () {
                    this.setState({showInfo: false});
                }.bind(this), 2000);
              /*  message = (<Alert
                    severity="success"
                    style={{marginTop: 15}}>
                    Saved ...
                </Alert>);*/
            } else if (this.props.message.type === 'SERVER_ERROR') {
                /*message = <Alert
                    severity="error"
                    style={{marginTop: 15}}>{this.props.title}
                </Alert>*/
            }
        }
        const {handleSubmit, isNew, actions, statusCode} = this.props
        return (
            <div>
              {/*  <Grid>
                    <TaskForm
                        value="2"
                        handleSubmitFunction={handleSubmit(this.saveForm)}
                        allAssignees={this.props.allAssignees}
                        hidden={this.value !== this.index}
                        acl={this.props.acl}
                        pageName={this.props.pageName}
                        isNew={isNew}
                        actions={actions}
                        statusCode={statusCode}
                        validationErrors={this.state.validationError}
                    />
                </Grid>*/}
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
        rlsEntries: state.taskReducer.payloads.task.acl
    }
});

TaskDocument = reduxForm({
    form: 'task_form',
    enableReinitialize: true
})(TaskDocument);

export default connect(mapStateToProps, {fetchTask, saveTask, fetchAssignees})(withRouter(TaskDocument));




