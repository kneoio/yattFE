import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Field, reduxForm} from 'redux-form'
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
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

class TaskDocument extends React.Component {
    constructor(props) {
        super(props);
        this.types = [
            {title: "UNKNOWN", code: 0},
            {title: "DEVELOPING", code: 21},
            {title: "TESTING", code: 22},
            {title: "DOCUMENT", code: 23}
        ];
        this.statuses = [
            {title: "UNKNOWN", code: 0},
            {title: "ON_TIME", code: 11},
            {title: "DELAYING", code: 12},
            {title: "STOPPED", code: 13},
        ];
        this.stages = [
            {title: "UNKNOWN", code: 0},
            {title: "DRAFT", code: 1},
            {title: "IN_PROGRESS", code: 2},
            {title: "DONE", code: 3},
            {title: "SUSPEND", code: 4}
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
            assignee: formData.assigneeId,
            deadline: formData.deadline,
            stageCode: formData.stageCode,
            statusCode: formData.statusCode,
            typeCode: formData.typeCode
        });
        this.cancelForm();
    }

    cancelForm = () => {
        this.props.history.push("/home");
    }

    renderSelectField = ({input, label, meta: {touched, error}, children, ...custom}) => (
        <Select
            style={{width: 200}}
            hintText={label}
            {...input}
            children={children}
            {...custom}
        />
    )

    renderDateField = ({input, label, meta: {touched, error}, ...custom}) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                style={{width: 200}}
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
            label={label}
            style={{width: 500}}
            variant="outlined"
            multiline
            rows="6"
            value="k;klk;"
            {...input}
            {...custom}
        />
    )

    render() {
        const {handleSubmit, load, pristine, reset, submitting} = this.props
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
                <form onSubmit={handleSubmit(this.saveForm)}>
                    <Grid container spacing={1} style={{marginTop: 100, marginLeft: 50}}>
                        <Field name="typeCode" component={this.renderSelectField}>
                            {this.types.map(row => (
                                <MenuItem value={row.code}>{row.title}</MenuItem>))}
                        </Field>
                    </Grid>
                    <Grid container spacing={1} style={{marginTop: 20, marginLeft: 50}}>
                        <Field name="statusCode" component={this.renderSelectField}>
                            {this.statuses.map(row => (
                                <MenuItem value={row.code}>{row.title}</MenuItem>))}
                        </Field>
                    </Grid>
                    <Grid container spacing={1} style={{marginTop: 20, marginLeft: 50}}>
                        <Field name="stageCode" component={this.renderSelectField} label="Stage">
                            {this.stages.map(row => (
                                <MenuItem value={row.code}>{row.title}</MenuItem>))}
                        </Field>
                    </Grid>
                    <Grid container spacing={1} style={{marginTop: 20, marginLeft: 50}}>
                        <Field name="deadline" component={this.renderDateField}/>
                    </Grid>
                    <Grid container spacing={1} style={{marginTop: 20, marginLeft: 50}}>
                        <Field name="assignee" component={this.renderComboboxField}/>
                    </Grid>
                    <Grid container spacing={1} style={{marginTop: 20, marginLeft: 50}} label="Description">
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
        typeCode: state.servEntity.serverPage.payload.typeCode,
        statusCode: state.servEntity.serverPage.payload.statusCode,
        stageCode: state.servEntity.serverPage.payload.stageCode,
        deadline: state.servEntity.serverPage.payload.deadline,
        assigneeId: state.servEntity.serverPage.payload.assigneeId,
        description: state.servEntity.serverPage.payload.description
    }
});

TaskDocument = reduxForm({
    form: 'task_form',
    enableReinitialize: true
})(TaskDocument);

export default connect(mapStateToProps, {fetchTask, saveTask, fetchAssignees})(withRouter(TaskDocument));




