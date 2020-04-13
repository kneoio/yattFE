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


class TaskView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            pageSize: 20,
            page: 1,
            isSignedUp: false
        };

        this.handleChangePage = this.handleChangePage.bind(this);
    }

    componentDidMount() {
        this.props.fetchTasks(this.state.pageSize, this.state.page);
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

    handleRowClick(event) {
        console.log(event);
    }

    render() {
        let viewPage = this.props.tasks.serverPage.payload;
        let rows = viewPage.result;
        let tableBody = "no data";
        if (rows) {
            tableBody = <TableBody>{rows.map(row => (
                <TableRow
                    hover
                    key={row.id}
                >
                    <TableCell padding="checkbox">
                        <Checkbox/>
                    </TableCell>
                    <TableCell component={Link} to={"/document/" + row.id}>{row.title}</TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                    <TableCell align="right">{row.stage}</TableCell>
                    <TableCell align="right">{row.deadline}</TableCell>
                </TableRow>
            ))} </TableBody>;
        }
        return (<div>
            <TableContainer>
                <TaskTablePagination view={viewPage}/>
                <Table>
                    <TaskTableHead/>
                    {tableBody};
                </Table>
            </TableContainer>
        </div>)
    }
}

class TaskTablePagination extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let viewPage = this.props.view;
        return(
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

const TaskTableHead = () => (
    <TableHead>
        <TableRow>
            <TableCell></TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Stage</TableCell>
            <TableCell>Deadline</TableCell>
        </TableRow>
    </TableHead>
)


TaskView.propTypes = {
    fetchTasks: PropTypes.func.isRequired,
    tasks: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    tasks: state.tasks,
});


export default connect(mapStateToProps, {fetchTasks})(TaskView);




