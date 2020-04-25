import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {reduxForm} from 'redux-form'
import {withRouter} from "react-router";
import {fetchTask, saveTask} from "../../store/task/actions";
import {fetchAssignees} from "../../store/assignees/actions";
import 'date-fns';
import Alert from "@material-ui/lab/Alert";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";

class MyAccount extends React.Component {

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
    }

    handleChange = (event, newValue) => {
        this.state.value = newValue;
    };

    saveForm(formData) {
        console.log('form data to send:', formData.description);
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
        console.log(this.props.response.type)
        if (this.props.response.type === 'ERROR') {
            message = <Alert severity="error" style={{marginTop: 15}}>{this.props.response.title}</Alert>
        } else {
            message = <Alert severity="info" style={{marginTop: 15}}>Saved successfully</Alert>
        }
        const {handleSubmit} = this.props
        return (
            <div>
                <AppBar>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            YATT
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid container spacing={1} style={{marginTop: 40}}>
                    <Paper>
                        <Tabs value={this.value}
                              onChange={this.handleChange}
                              aria-label="simple tabs example"
                              style={{marginTop: 20}}>
                            <Tab label="Common properties"/>
                            <Tab label="ACL"/>
                        </Tabs>
                    </Paper>
                </Grid>
                <Grid container spacing={1}>
                </Grid>
                {message}
            </div>
        )
    }
}

MyAccount.propTypes = {
    fetchTask: PropTypes.func.isRequired,
    saveTask: PropTypes.func.isRequired,
    fetchAssignees: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    allAssignees: state.assignees.serverPage,
    response: state.saving,
    id: state.servEntity.payload.id,
    initialValues: {
        typeCode: state.servEntity.payload.typeCode,
        statusCode: state.servEntity.payload.statusCode,
        stageCode: state.servEntity.payload.stageCode,
        deadline: state.servEntity.payload.deadline,
        assigneeId: state.servEntity.payload.assigneeId,
        description: state.servEntity.payload.description
    }
});

MyAccount = reduxForm({
    form: 'task_form',
    enableReinitialize: true
})(MyAccount);

export default connect(mapStateToProps, {fetchTask, saveTask, fetchAssignees})(withRouter(MyAccount));




