import * as React from 'react';
import {Field} from "redux-form";

import {ActionBar} from "../ActionBar";
import {AssigneeList} from "../AssigneeList";

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
/*

const renderMultiTextField = ({input, label, helperText, error, meta: {touched}, ...custom}) => (
    <TextField
        label={label}
        style={{width: 860}}
        variant="outlined"
        multiline
        rows="6"
        {...input}
        {...custom}
        error = {error}
        helperText ={helperText}

    />
)

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
                    <AssigneeList  allAssignees={props.allAssignees}/>

                </Grid>
            </Grid>
            <Grid container style={{marginTop: 20}}>
                <Typography variant="h6">Description</Typography>
            </Grid>
            <Grid container>
                <Field name="description"
                     component={renderMultiTextField}
                     error={props.validationErrors.description.isError}
                     helperText={props.validationErrors.description.message}
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

export const TaskForm = (props) => {
        //console.log("errorFields:", props.validationErrors)
        //console.log("Actions",props.actions)
        //console.log("Assignee",props.allAssignees)
        //console.log("all Props",props)
        /!*if (props.errFields && props.errFields.errorFields && props.errFields.errorFields.description) {
            description.error = true;
            description.helperText = props.errFields.errorFields.description.helperText;
        } else {
            description.error = false;
            description.helperText = "";
        }*!/

        //description.error = true;
        //description.helperText = props.errFields.errorFields.description.helperText;

        const [tabValue, setTabValue] = React.useState(0);
        const handleTabChange = (event, newValue) => {
            setTabValue(newValue);
        };

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
                                      color="secondary" label="new"/>}
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
                    {tabValue === 0 && <Tab1
                        allAssignees={props.allAssignees}
                        validationErrors={props.validationErrors}/>}
                    {tabValue === 1 && <Tab2 acl={props.acl}/>}
                </form>
            </Grid>
        );
    }
*/
