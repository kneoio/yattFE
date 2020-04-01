import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import {fetchTasks} from "../store/task/actions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import Link from "@material-ui/core/Link";

class TaskView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            pageSize: 20,
            page: 1
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

    handleRowClick (event) {
         console.log(event);
    }

    render() {
        let viewPage = this.props.tasks.serverPage.viewPage;
        let rows = viewPage.result;
        return <div>
            <TableContainer >
                <TablePagination
                    rowsPerPageOptions={[20, 50, 100, {value: -1, label: 'All'}]}
                    count={viewPage.count}
                    rowsPerPage={viewPage.pageSize}
                    page={viewPage.pageNum}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
                <Table>
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
                    <TableBody>
                        {rows.map(row => (
                            <TableRow
                                hover
                                key={row.id}
                                >
                                <TableCell padding="checkbox">
                                    <Checkbox

                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Link href={"document?id=" + row.id} >{row.title}</Link>
                                </TableCell>
                                <TableCell align="right">{row.type}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                                <TableCell align="right">{row.stage}</TableCell>
                                <TableCell align="right">{row.deadline}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    }
}

TaskView.propTypes = {
    fetchTasks: PropTypes.func.isRequired,
    tasks: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    tasks: state.tasks,
});


export default connect(mapStateToProps, {fetchTasks})(TaskView);




