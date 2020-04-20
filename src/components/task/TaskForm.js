import * as React from 'react';
import Grid from "@material-ui/core/Grid";
import {Field} from "redux-form";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TextField from "@material-ui/core/TextField";

const types = [
    {title: "UNKNOWN", code: 0},
    {title: "DEVELOPING", code: 21},
    {title: "TESTING", code: 22},
    {title: "DOCUMENT", code: 23}
];
 const statuses = [
    {title: "UNKNOWN", code: 0},
    {title: "ON_TIME", code: 11},
    {title: "DELAYING", code: 12},
    {title: "STOPPED", code: 13},
];
const stages = [
    {title: "UNKNOWN", code: 0},
    {title: "DRAFT", code: 1},
    {title: "IN_PROGRESS", code: 2},
    {title: "DONE", code: 3},
    {title: "SUSPEND", code: 4}
]

export const TaskForm = props => {

    const cancelForm = () => {
        this.props.history.push("/home");
    }

    const renderSelectField = ({input, label, meta: {touched, error}, children, ...custom}) => (
        <Select
            style={{width: 200}}
            //hintText={label}
            {...input}
            children={children}
            {...custom}
        />
    )

    const renderDateField = ({input, label, meta: {touched, error}, ...custom}) => (
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

    const renderComboboxField = ({input, label, meta: {touched, error}, ...custom}) => (
        <Select
            native
            style={{width: 500}}
            label="Assignee"
            {...input}
            {...custom}
        >
            {props.allAssignees.payload.result.map(row => (
                <option value={row.id}>{row.title}</option>))}
        </Select>
    )

    const renderMultiTextField = ({input, label, meta: {touched, error}, ...custom}) => (
        <TextField
            label={label}
            style={{width: 500}}
            variant="outlined"
            multiline
            rows="6"
            {...input}
            {...custom}
        />
    )

    return (<div>
            <form onSubmit={props.handleSubmitFunction}>
                <Grid container spacing={1} style={{marginTop: 100, marginLeft: 50}}>
                    <Field name="typeCode" component={renderSelectField}>
                        {types.map(row => (
                            <MenuItem key={row.code} value={row.code}>{row.title}</MenuItem>))}
                    </Field>
                </Grid>
                <Grid container spacing={1} style={{marginTop: 20, marginLeft: 50}}>
                    <Field name="statusCode" component={renderSelectField}>
                        {statuses.map(row => (
                            <MenuItem key={row.code} value={row.code}>{row.title}</MenuItem>))}
                    </Field>
                </Grid>
                <Grid container spacing={1} style={{marginTop: 20, marginLeft: 50}}>
                    <Field name="stageCode" component={renderSelectField} label="Stage">
                        {stages.map(row => (
                            <MenuItem key={row.code} value={row.code}>{row.title}</MenuItem>))}
                    </Field>
                </Grid>
                <Grid container spacing={1} style={{marginTop: 20, marginLeft: 50}}>
                    <Field name="deadline" component={renderDateField}/>
                </Grid>
                <Grid container spacing={1} style={{marginTop: 20, marginLeft: 50}}>
                    <Field name="assigneeId" component={renderComboboxField}/>
                </Grid>
                <Grid container spacing={1} style={{marginTop: 20, marginLeft: 50}} label="Description">
                    <Field name="description" component={renderMultiTextField}/>
                </Grid>
                <Grid container spacing={1} style={{marginTop: 20, marginLeft: 50}}>
                    <div>
                        <Button
                            variant="contained"
                            onClick={cancelForm}
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
    );
};