import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import {deleteTasks, fetchTasks} from "../../store/tasks/actions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import {Link} from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import {green} from "@material-ui/core/colors";
import yellow from "@material-ui/core/colors/yellow";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";


class TaskView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pageSize: 20,
            checkedRows: []
        }
    }

    componentDidMount() {
        this.props.fetchTasks(this.state.pageSize, 0);
    }

    handleChangePage = (event, page) => {
        this.props.fetchTasks(this.state.pageSize, page);
    };

    handleChangeRowsPerPage = (event) => {
        let size = parseInt(event.target.value, 10);
        this.setState({
            pageSize: size
        })
        this.props.fetchTasks(size, 0);
    }

    deleteRecord = (event) => {
        console.log(this.state.checkedRows)
        this.props.deleteTasks(this.state.checkedRows);
    }

    checkRecord = (id, isChecked) => {
        console.log(id, isChecked)
        if (isChecked) {
            this.setState(prevState => ({
                checkedRows: [...prevState.checkedRows, id]
            }));
        } else {
            this.setState({
                checkedRows: this.state.checkedRows.filter(function (prevId){
                    return prevId !== id
                })
            });
        }
    }

    render() {
        console.log('view prop', this.props)
        if (this.props.message) {
            if (this.props.message.type === 'ERROR' || this.props.message.type === 'HARD_ERROR') {
                return <Alert
                    severity="error"
                    style={{marginTop: 15, marginRight: 300}}>{this.props.message.title}
                </Alert>
            }
        }
        if (this.props.viewpage.type === '') {
            return (<Alert>loading</Alert>);
        } else if (this.props.viewpage.type === 'ERROR') {
            return (<Alert severity="error">{this.props.viewpage.title}</Alert>)
        }
        let view = this.props.viewpage.payloads.viewpage;
        let rows = view.result;
        if (!rows) {
            return (<Alert>Loading ...</Alert>);
        }
        return (
            <TableContainer>
                <Grid container justify="center">
                    <Grid item xs={6}>
                        <Toolbar>
                            <Button
                                variant="contained"
                                component={Link}
                                to={"/document/new"}>
                                Create
                            </Button>
                            <Button
                                variant="contained"
                                style={{marginLeft: 10}}
                                onClick={this.deleteRecord}>
                                Delete
                            </Button>
                        </Toolbar>
                    </Grid>
                    <Grid item xs={6} style={{marginTop: 15}} align="right">
                        <TaskTablePagination
                            view={view}
                            handleChangePage={this.handleChangePage}
                            handleChangeRowsPerPage={this.handleChangeRowsPerPage}/>
                    </Grid>
                </Grid>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Deadline</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => {
                            return <TaskTableRow tableRow={row} key={row.id} checker={this.checkRecord}/>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

class TaskTablePagination extends React.Component {

    render() {
        const {count, pageSize, pageNum} = this.props.view;
        return (
            <TablePagination
                rowsPerPageOptions={[10, 20, 50, 100, {value: -1, label: 'All'}]}
                count={count}
                rowsPerPage={pageSize}
                page={pageNum}
                onChangePage={this.props.handleChangePage}
                onChangeRowsPerPage={this.props.handleChangeRowsPerPage}
            />)
    }
}

class TaskTableRow extends React.Component {

    constructor(props) {
        super(props);
        this.priorities = [];
        this.priorities[0] = {title: "UNKNOWN", code: 0};
        this.priorities[11] = {title: "LOW", code: 11};
        this.priorities[12] = {title: "MIDDLE", code: 12};
        this.priorities[13] = {title: "HIGH", code: 13};
        this.priorities[14] = {title: "URGENT", code: 14};

        this.statuses = [];
        this.statuses[0] = <Chip size="small" label="unknown"/>;
        this.statuses[1] = <Chip size="small" variant="outlined" style={{backgroundColor: blue[500]}} label="draft"/>;
        this.statuses[2] =
            <Chip size="small" variant="outlined" style={{backgroundColor: yellow[200]}} label="in progress"/>;
        this.statuses[3] = <Chip size="small" variant="outlined" style={{backgroundColor: green[200]}} label="done"/>;
        this.statuses[4] = <Chip size="small" variant="outlined" style={{backgroundColor: red[200]}} label="suspend"/>;
    }


    handleCheck = (event, isInputChecked) => {
        //console.log(event.target.value, isInputChecked)
        this.props.checker(event.target.value, isInputChecked);
    };

    render() {
        return (
            <TableRow>
                <TableCell>
                    <Checkbox
                        value={this.props.tableRow.id}
                        onChange={this.handleCheck}
                    />
                </TableCell>
                <TableCell component={Link}
                           to={"/document/" + this.props.tableRow.id + "/"}>{this.props.tableRow.title}</TableCell>
                <TableCell>{this.priorities[this.props.tableRow.priorityCode].title}</TableCell>
                <TableCell>{this.statuses[this.props.tableRow.statusCode]}</TableCell>
                <TableCell>{this.props.tableRow.deadline}</TableCell>
            </TableRow>)
    }
}

TaskView.propTypes = {
    fetchTasks: PropTypes.func.isRequired,
    deleteTasks: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    message: state.messageReducer,
    viewpage: state.tasks.serverPage
});


export default connect(mapStateToProps, {fetchTasks, deleteTasks})(TaskView);




