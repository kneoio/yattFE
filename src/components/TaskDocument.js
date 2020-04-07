import React from 'react';
import {fetchTask} from "../store/task/actions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import {withRouter} from "react-router";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

class TaskDocument extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0
        };
        this.saveForm = this.saveForm.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchTask(id);
    }

    saveForm = event => {
        console.log(event);
        event.preventDefault();
        this.props.login(this.state.user, this.state.password);
    }

    cancelForm = event => {
        console.log(event);
        event.preventDefault();
        this.props.login(this.state.user, this.state.password);
    }

    render() {
        let page = this.props.task.serverPage;
        let document = page.payload;
        console.log(document.title);
        return (
            <form onSubmit={this.submitLogin}>
                <Grid container spacing={1} style={{marginTop: 100, marginLeft: 50}}>
                    <Select
                        native
                        value={document.type}
                    >
                        <option aria-label="None" value="Developing" />
                        <option value={"DEVELOPING"}>Developing</option>
                        <option value={"TESTING"}>Testing</option>
                        <option value={"DOCUMENTATION"}>Documentation</option>
                    </Select>
                </Grid>
                <Grid container spacing={1} style={{marginTop: 20, marginLeft: 50}}>
                    <TextField
                        style={{width: 150}}
                        id="outlined-disabled"
                        variant="outlined"
                        label="Status"
                        value={document.status}
                    />
                </Grid>
                <Grid container spacing={1} style={{marginTop: 20, marginLeft: 50}}>
                    <TextField
                        style={{width: 150}}
                        id="outlined-disabled"
                        variant="outlined"
                        label="Stage"
                        value={document.stage}
                    />
                </Grid>
                <Grid container spacing={1} style={{marginTop: 20, marginLeft: 50}}>
                    <TextField
                        style={{width: 200}}
                        id="outlined-disabled"
                        variant="outlined"
                        label="Deadline"
                        value={document.deadline}
                    />
                </Grid>
                <Grid container spacing={1} style={{marginTop: 20, marginLeft: 50}}>
                    <TextField
                        style={{width: 300}}
                        id="outlined-disabled"
                        variant="outlined"
                        label="Assignee"
                        value={document.assignee}
                    />
                </Grid>
                <Grid container spacing={1} style={{marginTop: 20, marginLeft: 50}}>
                    <TextField
                        style={{width: 500}}
                        id="outlined-disabled"
                        variant="outlined"
                        label="Description"
                        multiline
                        rows="6"
                        value={document.description}
                    />
                </Grid>
                <Grid container spacing={1} style={{marginTop: 20, marginLeft: 50}}>
                    <div>
                        <Button
                            variant="contained"
                            href="#contained-buttons"
                            onClick={this.cancelForm}
                        >
                            Close
                        </Button>
                        <Button
                            style={{marginLeft: 10}}
                            variant="contained"
                            color="primary"
                            href="#contained-buttons"
                            onClick={this.saveForm}
                        >
                            Save & close
                        </Button>
                    </div>
                </Grid>
            </form>
        )
    }
}

TaskDocument.propTypes = {
    fetchTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    task: state.task,
});

export default connect(mapStateToProps, {fetchTask})(withRouter(TaskDocument));




