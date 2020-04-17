import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import {fetchTasks} from "../store/tasks/actions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import {Link} from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import {logger} from "redux-logger/src";


class TaskView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            pageSize: 20,
            page: 0,
            isSignedUp: false
        };
    }

    componentDidMount() {
        this.props.fetchTasks(this.state.pageSize, this.state.page);
    }

    render() {
        if (this.props.tasks.type === ''){
            return (<Alert>loading</Alert>);
        } else if (this.props.tasks.type === 'ERROR'){
            return (<Alert severity="error">{this.props.tasks.title}</Alert>)
        }
        let viewPage = this.props.tasks.payload;
        let rows = viewPage.result;
        if (!rows) {
            return (<Alert>Loading ...</Alert>);
        }
        return(
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TaskTablePagination view={viewPage}/>
                        </TableRow>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Stage</TableCell>
                            <TableCell>Deadline</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{rows.map(row =>(
                        <TableRow hover  key={row.id}>
                            <TableCell padding="checkbox"><Checkbox/></TableCell>
                            <TableCell component={Link} to={"/document/" + row.id}>{row.title}</TableCell>
                            <TableCell align="right">{row.typeCode}</TableCell>
                            <TableCell align="right">{row.statusCode}</TableCell>
                            <TableCell align="right">{row.stageCode}</TableCell>
                            <TableCell align="right">{row.deadline}</TableCell>
                        </TableRow>
                    ))}</TableBody>
                </Table>
            </TableContainer>
        )
    }
}

class TaskTablePagination extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangePage = this.handleChangePage.bind(this);
    }

    handleChangePage(event, page) {
        this.props.fetchTasks(this.state.pageSize, page);
        this.setState({
            page: page
        })
    };

    handleChangeRowsPerPage = (event) => {
        let size = parseInt(event.target.value, 10);
        this.setState({
            pageSize: size
        })
        this.props.fetchTasks(size, 1);
    }

    render() {
        let viewPage = this.props.view;
        console.log(viewPage.pageNum)
        return (
            <TablePagination
                rowsPerPageOptions={[20, 50, 100, {value: -1, label: 'All'}]}
                count={viewPage.count}
                rowsPerPage={viewPage.pageSize}
                page={viewPage.pageNum}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />)
    }
}

TaskView.propTypes = {
    fetchTasks: PropTypes.func.isRequired,
    tasks: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    tasks: state.tasks.serverPage,
});


export default connect(mapStateToProps, {fetchTasks})(TaskView);




