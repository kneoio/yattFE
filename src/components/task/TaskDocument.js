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
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

class TaskDocument extends React.Component {

    state = {
        taskDocument: {},
        value: 1,
        index: 0
    }

    constructor(props) {
        super(props);
        this.saveForm = this.saveForm.bind(this);
    }

    componentDidMount() {
        this.props.fetchTask(this.props.match.params.id);
        this.props.fetchAssignees();
    }

    saveForm(formData) {
        this.props.saveTask({
            id: this.props.id,
            description: formData.description,
            assignee: Number(formData.assigneeId),
            deadline: formData.deadline,
            stageCode: formData.stageCode,
            statusCode: formData.statusCode,
            typeCode: formData.typeCode
        });
        //this.cancelForm();
    }


    render() {
        let message = '';
        if (this.props.response.type === 'ERROR') {
            message = <Alert severity="error" style={{marginTop: 15}}>{this.props.response.title}</Alert>
        } else {
            // message = <Alert severity="info" style={{marginTop: 15}}>Saved successfully</Alert>
        }
        const {handleSubmit} = this.props
        return (
            <div>
                <Grid style={{marginTop: 5, marginLeft: 10}}>
                    <Paper>
                        <Typography variant="h5" mr={5} align="left">{this.props.pageName}</Typography>
                    </Paper>
                </Grid>
                <Grid>
                    <TaskForm
                        value="2"
                        handleSubmitFunction={handleSubmit(this.saveForm)}
                        saveHandler={this.saveForm}
                        allAssignees={this.props.allAssignees}
                        hidden={this.value !== this.index}
                        acl={this.props.acl}
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
    response: state.saving,
    id: state.servEntity.payload.id,
    pageName: state.servEntity.pageName,
    title: state.servEntity.title,
    initialValues: {
        typeCode: state.servEntity.payload.typeCode,
        statusCode: state.servEntity.payload.statusCode,
        stageCode: state.servEntity.payload.stageCode,
        deadline: state.servEntity.payload.deadline,
        assigneeId: state.servEntity.payload.assigneeId,
        description: state.servEntity.payload.description
    },
    acl: {
        authorName: state.servEntity.payload.authorName,
        regDate: state.servEntity.payload.regDate,
        readers: state.servEntity.payload.readers
    }

});

TaskDocument = reduxForm({
    form: 'task_form',
    enableReinitialize: true
})(TaskDocument);

export default connect(mapStateToProps, {fetchTask, saveTask, fetchAssignees})(withRouter(TaskDocument));




