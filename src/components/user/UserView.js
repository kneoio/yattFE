import React from 'react';
import {deleteTasks, fetchTasks} from "../../store/tasks/actions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import {Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import paginationFactory, {PaginationListStandalone, PaginationProvider} from 'react-bootstrap-table2-paginator';
import InfoMessagebox from "../InfoMessagebox";
import ErrorMessagebox from "../ErrorMessagebox";


function linkFormatter(cell, row) {
    return (
        <Link style={{color: '#000000'}} to={"/document/" + row.id}>{row.title}</Link>
    );
}

function roleCellFormatter(cell, row) {
    return (
        row.roles
    );
}

const columns = [
    {
        dataField: 'login',
        text: 'Login',
        formatter: linkFormatter,
        editable: false
    },
    {
        dataField: 'email',
        text: 'E-mail',
        editable: false
    },
    {
        dataField: 'roles',
        text: 'Roles',
        editable: false,
        formatter: roleCellFormatter
    }];


class UserView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sizePerPage: 20,
            page: 1,
            data: [],
            totalSize: 0,
            selected: [],
            showMsg: false
        }
    }

    componentDidMount() {
        this.props.fetchTasks("users", this.state.sizePerPage, 0);
    }

    handleTableChange = (type, {page, sizePerPage}) => {
        this.props.fetchTasks("users", this.state.sizePerPage, page);
    }

    deleteRecord = () => {
        this.handleShowMsg();
        console.log(this.state.selected.length)
        if (this.state.selected.length > 0) {
            this.props.deleteTasks(this.state.selected, "users", this.state.sizePerPage, 0);
        } else {
            console.log("nothing is checked")
        }
    }

    handleOnSelect = (row, isSelect) => {
        if (isSelect) {
            this.setState(() => ({
                selected: [...this.state.selected, row.id]
            }));
        } else {
            this.setState(() => ({
                selected: this.state.selected.filter(x => x !== row.id)
            }));
        }
    }

    handleOnSelectAll = (isSelect, rows) => {
        const ids = rows.map(r => r.id);
        if (isSelect) {
            this.setState(() => ({
                selected: ids
            }));
        } else {
            this.setState(() => ({
                selected: []
            }));
        }
    }

    handleCloseMsg = () => {
        this.setState({
            showMsg: false,
            selected: []
        });
    }

    handleShowMsg = () => {
        this.setState({showMsg: true});
    }

    render() {
        let message = '';
        //console.log('view prop', this.props.message)
        if (this.props.message && this.state.showMsg) {
            if (this.props.message.type === 'ERROR' || this.props.message.type === 'HARD_ERROR') {
                message = <ErrorMessagebox closeHandler={this.handleCloseMsg} message={this.props.message}/>
            } else if (this.props.message.type === 'INFO') {
                message = <InfoMessagebox closeHandler={this.handleCloseMsg} message={this.props.message}/>
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

        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            selected: this.state.selected,
            onSelect: this.handleOnSelect,
            onSelectAll: this.handleOnSelectAll
        };
        let page = view.page;
        let sizePerPage = view.pageSize;
        let totalSize = view.count;

        return (
            <Container fluid>
                <Row>
                    <Col>
                        {message}
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                        <ButtonGroup>
                            <Button
                                variant="outline-success"
                                as={Link}
                                to={"/document/new"}>
                                Create
                            </Button>
                            <Button
                                variant="outline-danger"
                                onClick={this.deleteRecord}>
                                Delete
                            </Button>
                        </ButtonGroup>
                    </Col>
                    <Col>
                        <h4 className="font-weight-bold">Users</h4>
                    </Col>
                </Row>
                <PaginationProvider
                    pagination={paginationFactory({
                        custom: true,
                        page,
                        sizePerPage,
                        totalSize
                    })
                    }
                >
                    {
                        ({paginationProps, paginationTableProps}) => (
                            <div>
                                <Row className="mt-3">
                                    <Col>
                                        <PaginationListStandalone
                                            {...paginationProps}
                                        />
                                    </Col>
                                    <Col className="text-right">
                                        <small>{paginationProps.page}-{paginationProps.sizePerPage} of {view.count}</small>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <BootstrapTable
                                            remote
                                            keyField="id"
                                            data={rows}
                                            columns={columns}
                                            selectRow={selectRow}
                                            cellEdit={cellEditFactory({mode: 'click'})}
                                            onTableChange={this.handleTableChange}
                                            noDataIndication="No data"
                                            bootstrap4
                                        />
                                    </Col>
                                </Row>
                            </div>
                        )
                    }
                </PaginationProvider>
            </Container>
        )
    }
}

UserView.propTypes = {
    fetchTasks: PropTypes.func.isRequired,
    deleteTasks: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    message: state.messageReducer,
    viewpage: state.tasks.serverPage
});


export default connect(mapStateToProps, {fetchTasks, deleteTasks})(UserView);




