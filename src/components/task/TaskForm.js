import * as React from 'react';
import Grid from "@material-ui/core/Grid";
import {Field} from "redux-form";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {Link} from "react-router-dom";
import TableContainer from "@material-ui/core/TableContainer";
import {green} from '@material-ui/core/colors';
import red from "@material-ui/core/colors/red";

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
    const [tabValue, setTabValue] = React.useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const cancelForm = () => {
        window.location.replace('/view/tasks');
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
            <option value={"00000000-0000-0000-0000-000000000000"} key={"0"}></option>
            {props.allAssignees.payload.result.map(row => (
                <option value={row.id} key={row.id}>{row.title}</option>))}
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

    const Tab1 = () => {
        return (<div index={1}>
                <Grid container justify="center" style={{marginTop: 30, marginLeft: 50}}>
                    <Grid xs={4} item={true}>
                        <Typography variant="h6" align="right" style={{marginRight: 10}}>Type</Typography>
                    </Grid>
                    <Grid xs={8} align="left" item={true}>
                        <Field name="typeCode" component={renderSelectField}>
                            {types.map(row => (
                                <MenuItem key={row.code} value={row.code}>{row.title}</MenuItem>))}
                        </Field>
                    </Grid>
                </Grid>
                <Grid container style={{marginTop: 20, marginLeft: 50}}>
                    <Grid xs={4} item={true}>
                        <Typography variant="h6" align="right"
                                    style={{marginRight: 10}}>Status</Typography>
                    </Grid>
                    <Grid xs={8} align="left" item={true}>
                        <Field name="statusCode" component={renderSelectField}>
                            {statuses.map(row => (
                                <MenuItem key={row.code} value={row.code}>{row.title}</MenuItem>))}
                        </Field>
                    </Grid>
                </Grid>
                <Grid container style={{marginTop: 20, marginLeft: 50}}>
                    <Grid xs={4} item={true}>
                        <Typography variant="h6"  align="right" style={{marginRight: 10}}>Stage</Typography>
                    </Grid>
                    <Grid xs={8} align="left" item={true}>
                        <Field name="stageCode" component={renderSelectField} label="Stage">
                            {stages.map(row => (
                                <MenuItem key={row.code} value={row.code}>{row.title}</MenuItem>))}
                        </Field>
                    </Grid>
                </Grid>
                <Grid container style={{marginTop: 20, marginLeft: 50}}>
                    <Grid xs={4} item={true}>
                        <Typography variant="h6" align="right"
                                    style={{marginRight: 10}}>Deadline</Typography>
                    </Grid>
                    <Grid xs={8} align="left" item={true}>
                        <Field name="deadline" component={renderDateField}/>
                    </Grid>
                </Grid>
                <Grid container style={{marginTop: 20, marginLeft: 50}}>
                    <Grid xs={4} item={true}>
                        <Typography variant="h6"  align="right"
                                    style={{marginRight: 10}}>Assignee</Typography>
                    </Grid>
                    <Grid xs={8} item={true}>
                        <Field name="assigneeId" component={renderComboboxField}/>
                    </Grid>
                </Grid>
                <Grid container style={{marginTop: 20, marginLeft: 50}}>
                    <Typography variant="h6" >Description</Typography>
                </Grid>
                <Grid container style={{marginLeft: 50}}>
                    <Field name="description" component={renderMultiTextField}/>
                </Grid>
            </div>
        )
    }

    const Tab2 = (props) => {
        return (<div index={2}>
            <Grid container justify="center" style={{marginTop: 30, marginLeft: 50}}>
                <Grid xs={4} item={true}>
                    <Typography variant="h6"  align="right" style={{marginRight: 10}}>Author</Typography>
                </Grid>
                <Grid xs={8} align="left" item={true} style={{width: 500}} gutterbottom>
                    <Typography variant="button" >{props.acl.authorName}</Typography>
                </Grid>
            </Grid>
            <Grid container justify="center" style={{marginTop: 5, marginLeft: 50}}>
                <Grid xs={4} item={true}>
                    <Typography variant="h6" align="right" style={{marginRight: 10}}>Created
                        at</Typography>
                </Grid>
                <Grid xs={8} item={true} align="left" style={{width: 500}}>
                    <Typography variant="button" >{props.acl.regDate}</Typography>
                </Grid>
            </Grid>
            <Grid container justify="center" style={{marginTop: 5, marginLeft: 50}}>
                <Grid xs={4} item={true}>
                    <Typography variant="h6" align="right" style={{marginRight: 10}}>
                        Last modification
                    </Typography>
                </Grid>
                <Grid xs={8} item={true} align="left" style={{width: 500}}>
                    <Typography variant="button"></Typography>
                </Grid>
            </Grid>
            <Grid container justify="center" style={{marginTop: 5, marginLeft: 50}}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{width: 100}}>User</TableCell>
                                <TableCell>Can read</TableCell>
                                <TableCell>Was read at</TableCell>
                                <TableCell>Can edit</TableCell>
                                <TableCell>Can delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{props.acl.readers.map(row => (
                            <TableRow hover key={row.id}>
                                <TableCell component={Link} to={"/users/" + row.readerName}>
                                    <Typography>{row.readerName}</Typography>
                                </TableCell>
                                <TableCell align="center"><CheckCircleIcon style={{color: green[500]}}/></TableCell>
                                <TableCell align="center">{row.readingTime}</TableCell>
                                <TableCell align="center">
                                    {(row.editAllowed === 1 || row.editAllowed === 2) &&
                                    <CheckCircleIcon style={{color: green[500]}}/>}
                                </TableCell>
                                <TableCell align="center">{row.editAllowed === 2 &&
                                <CheckCircleIcon style={{color: red[300]}}/>}</TableCell>
                            </TableRow>
                        ))}</TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </div>)
    }

    return (
        <Grid container spacing={1}>
            <form onSubmit={props.handleSubmitFunction}>
                <Paper>
                    <Tabs value={tabValue}
                          onChange={handleTabChange}
                          aria-label="simple tabs example"
                          style={{marginTop: 20}}>
                        <Tab label="properties"/>
                        <Tab label="ACL"/>
                    </Tabs>
                </Paper>
                {tabValue === 0 && <Tab1/>}
                {tabValue === 1 && <Tab2 acl={props.acl}/>}
                <Grid container style={{marginTop: 20, marginLeft: 50}}>
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
        </Grid>
    );
};