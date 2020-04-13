import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Field, reduxForm} from 'redux-form'
import TextField from "@material-ui/core/TextField";
import {withRouter} from "react-router";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {fetchTask, saveTask} from "../../store/task/actions";
import {fetchAssignees} from "../../store/assignees/actions";
import Select from "@material-ui/core/Select";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";


class TaskDocument extends React.Component {
    constructor(props) {
        super(props);
        this.types = [
            {title: "UNKNOWN", code: 0},
            {title: "DRAFT", code: 1},
            {title: "IN_PROGRESS", code: 2},
            {title: "DONE", code: 3},
            {title: "SUSPEND", code: 4},
        ];
        this.statuses = [
            {title: "UNKNOWN", code: 0},
            {title: "DRAFT", code: 1},
            {title: "IN_PROGRESS", code: 2},
            {title: "DONE", code: 3},
            {title: "SUSPEND", code: 4},
        ];
        this.stages = [
            {title: "UNKNOWN", code: 0},
            {title: "DRAFT", code: 1},
            {title: "IN_PROGRESS", code: 2},
            {title: "DONE", code: 3},
            {title: "SUSPEND", code: 4},
        ]
        this.saveForm = this.saveForm.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchTask(id);
        this.props.fetchAssignees();
    }

    saveForm(formData) {
        console.log('form data to send:', formData.description);
        this.props.saveTask({
            description: formData.description,
            assignee: formData.assignee,
            deadline: formData.deadline,
            stage: formData.stage,
            status: formData.status,
            type: formData.type
        });

    }

    cancelForm = () => {
        this.props.history.push("/home");
    }

    renderStaticComboboxField = ({input, label, meta: {touched, error}, ...custom}) => (
        <Select
            native
            style={{width: 200}}
            {...input}
            {...custom}
        >
            {this.stages.map(row => (
                <option value={row.code}>{row.title}</option>))}
        </Select>
    )

    renderDateField = ({input, label, meta: {touched, error}, ...custom}) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd.MM.yyyy"
                margin="normal"
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                {...input}
                {...custom}
            />
        </MuiPickersUtilsProvider>
    )

    renderComboboxField = ({input, label, meta: {touched, error}, ...custom}) => (
        <Select
            native
            style={{width: 500}}
            label="Assignee"
            {...input}
            {...custom}
        >
            {this.props.allAssignees.payload.result.map(row => (
                <option value={row.id}>{row.title}</option>))}
        </Select>
    )

    renderMultiTextField = ({input, label, meta: {touched, error}, ...custom}) => (
        <TextField
            label='Description'
            style={{width: 500}}
            variant="outlined"
            multiline
            rows="6"
            {...input}
            {...custom}
        />
    )

    render() {
        const {handleSubmit, load, pristine, reset, submitting} = this.props
        return (
            <div>
                <AppBar>
                    <Toolbar >
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
                <form onSubmit={handleSubmit(this.saveForm)}>
                    <Grid container spacing={1} style={{marginTop: 100, marginLeft: 50}}>
                        <Field name="type" component={this.renderStaticComboboxField}/>
                    </Grid>
                    <Grid container spacing={1} style={{marginTop: 20, marginLeft: 50}}>
                        <Field name="status" component={this.renderStaticComboboxField}/>
                    </Grid>
                    <Grid container spacing={1} style={{marginTop: 20, marginLeft: 50}}>
                        <Field name="stage" component={this.renderStaticComboboxField}/>
                    </Grid>
                    <Grid container spacing={1} style={{marginTop: 20, marginLeft: 50}}>
                        <Field name="deadline" component={this.renderDateField}/>
                    </Grid>
                    <Grid container spacing={1} style={{marginTop: 20, marginLeft: 50}}>
                        <Field name="assignee" component={this.renderComboboxField}/>
                    </Grid>
                    <Grid container spacing={1} style={{marginTop: 20, marginLeft: 50}}>
                        <Field name="description" component={this.renderMultiTextField}/>
                    </Grid>
                    <Grid container spacing={1} style={{marginTop: 20, marginLeft: 50}}>
                        <div>
                            <Button
                                variant="contained"
                                onClick={this.cancelForm}
                            >
                                Close
                            </Button>
                            <Button type="submit" color="primary" variant="contained" style={{marginLeft: 10}}>
                                Save & close
                            </Button>
                        </div>
                    </Grid>
                </form>
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
    initialValues: {
        type: state.servEntity.serverPage.payload.typeCode,
        status: state.servEntity.serverPage.payload.statusCode,
        stage: state.servEntity.serverPage.payload.stageCode,
        deadline: state.servEntity.serverPage.payload.deadline,
        assignee: state.servEntity.serverPage.payload.assignee.id,
        description: state.servEntity.serverPage.payload.description

    }
});

TaskDocument = reduxForm({
    form: 'task_form',
    enableReinitialize: true
})(TaskDocument);

export default connect(mapStateToProps, {fetchTask, saveTask, fetchAssignees})(withRouter(TaskDocument));




