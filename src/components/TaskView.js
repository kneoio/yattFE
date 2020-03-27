import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import axios from 'axios';

export default class TaskView extends React.Component {

    constructor(props) {
        super(props);
        this.state = { count: props.initialCount };
        this.selected = 0;
        this.state.rows = {};

        this.rows = [
            createData('Cupcake', 305, 3.7, 67, 4.3),
            createData('Donut', 452, 25.0, 51, 4.9),
            createData('Eclair', 262, 16.0, 24, 6.0),
            createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
            createData('Gingerbread', 356, 16.0, 49, 3.9),
            createData('Honeycomb', 408, 3.2, 87, 6.5),
            createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
            createData('Jelly Bean', 375, 0.0, 94, 0.0),
            createData('KitKat', 518, 26.0, 65, 7.0),
            createData('Lollipop', 392, 0.2, 98, 0.0),
            createData('Marshmallow', 318, 0, 81, 2.0),
            createData('Nougat', 360, 19.0, 9, 37.0),
            createData('Oreo', 437, 18.0, 63, 4.0),
        ];
        this.classes = makeStyles(theme => ({
            root: {
                width: '100%',
            },
            paper: {
                width: '100%',
                marginBottom: theme.spacing(2),
            },
            table: {
                minWidth: 750,
            },
            visuallyHidden: {
                border: 0,
                clip: 'rect(0 0 0 0)',
                height: 1,
                margin: -1,
                overflow: 'hidden',
                padding: 0,
                position: 'absolute',
                top: 20,
                width: 1,
            },
        }));
        this.useToolbarStyles = makeStyles(theme => ({
            root: {
                paddingLeft: theme.spacing(2),
                paddingRight: theme.spacing(1),
            },
            highlight:
                theme.palette.type === 'light'
                    ? {
                        color: theme.palette.secondary.main,
                        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                    }
                    : {
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.secondary.dark,
                    },
            title: {
                flex: '1 1 100%',
            },
        }));
        this.headCells = [
            { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
            { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
            { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
            { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
            { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
        ];

        this.render = this.render.bind(this);
    }

    render() {
        return <div className={this.classes.root}>
            <Paper className={this.classes.paper}>
                {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                <TableContainer>
                    <Table
                        className={this.classes.table}                    >
                        <EnhancedTableHead
                            classes={this.classes}
                            numSelected={this.selected.length}
                            order={this.order}
                            orderBy={this.orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={this.rows.length}
                        />
                        <TableBody>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    }

    requestData(e) {
        e.preventDefault()
        axios
            .get('http://localhost:8080/tasks?pageSize=8&pageNum=2')
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const EnhancedTableToolbar = props => {
    let classes = this.useToolbarStyles();
    const { numSelected } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1">
                    {numSelected} selected
                </Typography>
            ) : (
                    <Typography className={classes.title} variant="h6" id="tableTitle">
                        Nutrition
                    </Typography>
                )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
        </Toolbar>
    );
};

const EnhancedTableHead = props => {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    /> 
                </TableCell>
                <TableCell padding="checkbox">
                    defew
                </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};


