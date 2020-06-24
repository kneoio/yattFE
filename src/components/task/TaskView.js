import React from 'react';
import {deleteTasks, fetchTasks} from "../../store/tasks/actions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import {Badge, FormCheck, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import Table from "react-bootstrap/Table";
import {blue, green, red, yellow} from "color-name";


class TaskView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pageSize: 20,
            checkedRows: [],
            showInfo: true
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
                checkedRows: this.state.checkedRows.filter(function (prevId) {
                    return prevId !== id
                })
            });
        }
    }

    render() {
        //console.log('view prop', this.props)
        let message = '';
        if (this.props.message) {
            if (this.props.message.type === 'ERROR' || this.props.message.type === 'HARD_ERROR') {
                message = <Alert
                    severity="error"
                    style={{marginTop: 15, marginRight: 300}}>{this.props.message.title}
                </Alert>
            } else if (this.props.message.type === 'INFO' && this.state.showInfo) {
                setTimeout(function () {
                    this.setState({showInfo: false});
                }.bind(this), 2000);
                if (this.props.message.title === 'SUCCESS') {
                    message = (<Alert severity="success" style={{marginTop: 15}}> {this.props.message.title} </Alert>);
                } else {
                    message = (<Alert severity="warning" style={{marginTop: 15}}>{this.props.message.title}</Alert>);
                }
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
            <div>
                <Row>
                    <Col>
                        {message}
                    </Col>
                </Row>
                <Row>
                    <Col className="my-2">
                        <ButtonGroup>
                            <Button
                                component={Link}
                                to={"/document/new"}>
                                Create
                            </Button>
                            <Button
                                onClick={this.deleteRecord}>
                                Delete
                            </Button>
                        </ButtonGroup>
                    </Col>
                    <Col className="my-2">
                        <TaskTablePagination
                            view={view}
                            handleChangePage={this.handleChangePage}
                            handleChangeRowsPerPage={this.handleChangeRowsPerPage}/>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Table striped bordered hove>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Description</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Deadline</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rows.map(row => {
                                return <TaskTableRow tableRow={row} key={row.id} checker={this.checkRecord}/>
                            })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        )
    }
}

class TaskTablePagination
    extends React
        .Component {

    render() {
        const {count, pageSize, pageNum} = this.props.view;
        return (
            <Pagination>
                <Pagination.First/>
                <Pagination.Prev/>
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis/>

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item disabled>{14}</Pagination.Item>

                <Pagination.Ellipsis/>
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next/>
                <Pagination.Last/>
            </Pagination>

            /*<TablePagination
                rowsPerPageOptions={[10, 20, 50, 100, {value: -1, label: 'All'}]}
                count={count}
                rowsPerPage={pageSize}
                page={pageNum}
                onChangePage={this.props.handleChangePage}
                onChangeRowsPerPage={this.props.handleChangeRowsPerPage}
            />*/)
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
        this.statuses[0] = <Badge label="unknown"/>;
        this.statuses[1] = <Badge style={{backgroundColor: "#a1a199", width:80}}>draft</Badge>;
        this.statuses[2] = <Badge style={{backgroundColor: "#96bf8c", width:80}}>in progress</Badge>;
        this.statuses[3] = <Badge style={{backgroundColor: "#9eb7de", width:80}}>done</Badge>;
        this.statuses[4] = <Badge style={{backgroundColor: "#e8e15c", width:80}}>suspend</Badge>;
    }


    handleCheck = (event, isInputChecked) => {
        this.props.checker(event.target.value, isInputChecked);
    };

    render() {
        return (
            <tr>
                <td>
                    <FormCheck value={this.props.tableRow.id} onChange={this.handleCheck}/>
                    {/*<div className="form-check"
                         onChange={this.handleCheck}>
                    </div>*/}
                </td>
                <td component={Link} to={"/document/" + this.props.tableRow.id + "/"}>{this.props.tableRow.title}</td>
                <td>{this.priorities[this.props.tableRow.priorityCode].title}</td>
                <td>{this.statuses[this.props.tableRow.statusCode]}</td>
                <td>{this.props.tableRow.deadline}</td>
            </tr>)
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




