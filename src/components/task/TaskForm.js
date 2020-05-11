import * as React from 'react';
import Grid from "@material-ui/core/Grid";
import {Field} from "redux-form";
import MenuItem from "@material-ui/core/MenuItem";
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
import Toolbar from "@material-ui/core/Toolbar";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import {ActionBar} from "../ActionBar";

const types = [
    {title: "UNKNOWN", code: 0},
    {title: "DEVELOPING", code: 21},
    {title: "TESTING", code: 22},
    {title: "DOCUMENT", code: 23}
];
const priorities = [
    {title: "UNKNOWN", code: 0},
    {title: "LOW", code: 11},
    {title: "MIDDLE", code: 12},
    {title: "HIGH", code: 13},
    {title: "URGENT", code: 14}
];
const statuses = [
    {title: "UNKNOWN", code: 0},
    {title: "DRAFT", code: 1},
    {title: "IN_PROGRESS", code: 2},
    {title: "DONE", code: 3},
    {title: "SUSPEND", code: 4}
]

let description = {
    error: false,
    helperText: ""
}


export const TaskForm = (props) => {
        //console.log("errorFields:", props.errFields)
        //console.log("Actions",props.actions)
        //console.log("Assignee",props.allAssignees)
        //console.log("all Props",props)
        if (props.errFields && props.errFields.errorFields && props.errFields.errorFields.description) {
            description.error = true;
            description.helperText = props.errFields.errorFields.description.helperText;
        } else {
            description.error = false;
            description.helperText = "";
        }
        const [tabValue, setTabValue] = React.useState(0);

        const handleTabChange = (event, newValue) => {
            setTabValue(newValue);
        };

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
                <option value={"00000000-0000-0000-0000-000000000000"} key={"0"}>No one</option>
                {props.allAssignees.payloads.viewpage.result.map(row => (
                    <option value={row.id} key={row.id}>{row.title}</option>))}
            </Select>
        )

        const renderMultiTextField = ({input, label, meta: {touched, error}, ...custom}) => (
            <TextField
                label={label}
                style={{width: 860}}
                variant="outlined"
                multiline
                rows="6"
                {...input}
                {...custom}
            />
        )

        const Tab1 = (props) => {
            return (<div index={1}>
                    <Grid container style={{marginTop: 30}}>
                        <Grid item xs={3} >
                            <Typography variant="h6" align="right" style={{marginRight: 10}}>Type</Typography>
                        </Grid>
                        <Grid item xs={9} align="left">
                            <Field name="typeCode" component={renderSelectField}>
                                {types.map(row => (
                                    <MenuItem key={row.code} value={row.code}>{row.title}</MenuItem>))}
                            </Field>
                        </Grid>
                    </Grid>
                    <Grid container style={{marginTop: 20}}>
                        <Grid item xs={3} >
                            <Typography variant="h6" align="right" style={{marginRight: 10}}>Priority</Typography>
                        </Grid>
                        <Grid item xs={9} align="left">
                            <Field name="priorityCode" component={renderSelectField}  label="Priority">
                                {priorities.map(row => (
                                    <MenuItem key={row.code} value={row.code}>{row.title}</MenuItem>))}
                            </Field>
                        </Grid>
                    </Grid>
                    <Grid container style={{marginTop: 20}}>
                        <Grid item xs={3}>
                            <Typography variant="h6" align="right"
                                        style={{marginRight: 10}}>Deadline</Typography>
                        </Grid>
                        <Grid item xs={9} align="left">
                            <Field name="deadline" component={renderDateField}/>
                        </Grid>
                    </Grid>
                    <Grid container style={{marginTop: 20}}>
                        <Grid item xs={3} >
                            <Typography variant="h6" align="right"
                                        style={{marginRight: 10}}>Assignee</Typography>
                        </Grid>
                        <Grid item xs={9} align="left" >
                            <Field name="assigneeId" component={renderComboboxField}/>
                        </Grid>
                    </Grid>
                    <Grid container style={{marginTop: 20}}>
                        <Typography variant="h6">Description</Typography>
                    </Grid>
                    <Grid container>
                        <Field name="description"
                               component={renderMultiTextField}
                               error={props.ver.error}
                               helperText={props.ver.helperText}
                        />
                    </Grid>
                </div>
            )
        }

        const Tab2 = (props) => {
           // console.log("acl",props.acl)
            return (<div index={2}>
                <Grid container style={{marginTop: 30, marginLeft: 50}}>
                    <Grid item xs={3} >
                        <Typography variant="h6" align="right" style={{marginRight: 10}}>Author</Typography>
                    </Grid>
                    <Grid item xs={9} align="left"  style={{width: 500}}>
                        <Typography variant="button">{props.acl.authorName}</Typography>
                    </Grid>
                </Grid>
                <Grid  container style={{marginTop: 5, marginLeft: 50}}>
                    <Grid item xs={3} >
                        <Typography variant="h6" align="right" style={{marginRight: 10}}>Created
                            at</Typography>
                    </Grid>
                    <Grid item xs={9}  align="left" style={{width: 500}}>
                        <Typography variant="button">{props.acl.regDate}</Typography>
                    </Grid>
                </Grid>
                <Grid  container style={{marginTop: 5, marginLeft: 50}}>
                    <Grid item xs={3}>
                        <Typography variant="h6" align="right" style={{marginRight: 10}}>
                            Last modification
                        </Typography>
                    </Grid>
                    <Grid item xs={9} align="left" style={{width: 500}}>
                        <Typography variant="button"></Typography>
                    </Grid>
                </Grid>
                <Grid container style={{marginTop: 5, marginLeft: 50, marginRight: 20}}>
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
                            <TableBody>{props.acl.rlsEntries.map(row => (
                                <TableRow key={row.readerName}>
                                    <TableCell to={"/users/" + row.readerName}>
                                        <Typography>{row.readerName}</Typography>
                                    </TableCell>
                                    <TableCell aligncontent="center"><CheckCircleIcon
                                        style={{color: green[500]}}/></TableCell>
                                    <TableCell aligncontent="center">{row.readingTime}</TableCell>
                                    <TableCell aligncontent="center">
                                        {(row.editAllowed === 1 || row.editAllowed === 2) &&
                                        <CheckCircleIcon style={{color: green[500], alignContent: "center"}}/>}
                                    </TableCell>
                                    <TableCell aligncontent="center">{row.editAllowed === 2 &&
                                    <CheckCircleIcon style={{color: red[300]}}/>}</TableCell>
                                </TableRow>
                            ))}</TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </div>)
        }

        return (
            <Grid style={{marginLeft: 10, marginRight: 20}}>
                <form onSubmit={props.handleSubmitFunction}>
                    <Grid container >
                        <Grid item xs={6}>
                            <Toolbar>
                                <ActionBar actions={props.actions}/>
                                {props.priorityCode}
                            </Toolbar>
                        </Grid>
                        <Grid item xs={6} style={{marginTop: 15}} align="right">
                            <Typography justify-xs-center="true"
                                        style={{marginRight: 20}}
                                        variant="h5"
                                        color={"textSecondary"}>
                                {props.pageName}
                                {props.isNew &&
                                <Chip style={{marginLeft: 10, marginBottom: 10}} variant="outlined" size="small"
                                      label="new"/>}
                                <Chip style={{marginLeft: 10, marginBottom: 10}} variant="outlined" size="small"
                                        label={props.statusCode}/>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <Paper>
                        <Tabs value={tabValue}
                              onChange={handleTabChange}
                              aria-label="simple tabs example"
                              style={{marginTop: 20}}>
                            <Tab label="properties"/>
                            <Tab label="ACL"/>
                        </Tabs>
                    </Paper>
                    {tabValue === 0 && <Tab1 ver={description}/>}
                    {tabValue === 1 && <Tab2 acl={props.acl}/>}
                </form>
            </Grid>
        );
    }
