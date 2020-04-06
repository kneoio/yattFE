import React, {useEffect, useState} from 'react';
import {fetchTask} from "../store/task/actions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {Box} from "@material-ui/core";

class TaskDocument extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0
        };
        //this.handleChangePage = this.handleChangePage.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchTask(id);
    }

    render() {
        return (
            <form onSubmit={this.submitLogin}>
                <Grid container spacing={1} style={{marginTop: 100, marginLeft: 30}}>
                    <Box style={{marginTop: 10, marginRight: 10}}>text</Box>
                        <TextField
                            id="outlined-disabled"
                            label="User name"
                            variant="outlined"
                        />

                </Grid>
                <Grid container spacing={1} style={{marginTop: 20, marginLeft: 30}}>
                    <Box style={{marginTop: 10, marginRight: 10}}>text</Box>
                    <TextField
                        id="outlined-disabled"
                        label="User name"
                        variant="outlined"
                    />

                </Grid>
            </form>
        )
    }
}

TaskDocument.propTypes = {
    fetchTask: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    tasks: state.task,
});

export default connect(mapStateToProps, {fetchTask})(withRouter(TaskDocument));




