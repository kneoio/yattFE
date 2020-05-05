import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import {fetchTasks} from "../../store/tasks/actions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import {Link} from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

class TaskView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pageSize: 20
        }
    }

    componentDidMount() {
        this.props.fetchTasks(this.state.pageSize, 0);
    }

    handleChangePage = (event, page) => {
        console.log("change page", this.state.pageSize)
        this.props.fetchTasks(this.state.pageSize, page);
    };

    handleChangeRowsPerPage = (event) => {
        let size = parseInt(event.target.value, 10);
        this.setState({
            pageSize: size
        })
        this.props.fetchTasks(size, 0);
    }

    render() {
        if (this.props.viewPage.type === '') {
            return (<Alert>loading</Alert>);
        } else if (this.props.viewPage.type === 'ERROR') {
            return (<Alert severity="error">{this.props.viewPage.title}</Alert>)
        }
        let view = this.props.viewPage.payload;
        let rows = view.result;
        if (!rows) {
            return (<Alert>Loading ...</Alert>);
        }
        return (
            <TableContainer>
                <Grid container justify="center">
                    <Grid xs={6}>
                        <Toolbar>
                            <Button
                                variant="contained"
                                component={Link}
                                to={"/document/new"}>
                                Create
                            </Button>
                        </Toolbar>
                    </Grid>
                    <Grid xs={6} style={{marginTop: 15}}  align="right">
                        <TaskTablePagination

                            view={view}
                            handleChangePage={this.handleChangePage}
                            handleChangeRowsPerPage={this.handleChangeRowsPerPage}/>
                    </Grid>
                </Grid>
                <Table>
                    <TableHead>
                        <TableRow>



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
                    <TableBody>
                        {rows.map(row => {
                            return <TableRow key={row.id}>
                                <TableCell padding="checkbox"><Checkbox/></TableCell>
                                <TableCell component={Link} to={"/document/" + row.id}>{row.title}</TableCell>
                                <TableCell>{row.typeCode}</TableCell>
                                <TableCell>{row.statusCode}</TableCell>
                                <TableCell>{row.stageCode}</TableCell>
                                <TableCell>{row.deadline}</TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

class TaskTablePagination extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { count, pageSize, pageNum } = this.props.view;
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

TaskView.propTypes = {
    fetchTasks: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    viewPage: state.tasks.serverPage,
});


export default connect(mapStateToProps, {fetchTasks})(TaskView);




