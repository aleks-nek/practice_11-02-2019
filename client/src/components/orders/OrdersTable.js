import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import OrderAddIcon from '@material-ui/icons/PlaylistAdd';
import {lighten} from '@material-ui/core/styles/colorManipulator';


function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
    { id: 'orderType', numeric: false, disablePadding: true, label: 'Order type' },
    { id: 'client', numeric: false, disablePadding: false, label: 'Client' },
    { id: 'deviceType', numeric: false, disablePadding: false, label: 'Device type' },
    { id: 'imei', numeric: false, disablePadding: false, label: 'IMEI' },
    { id: 'brand', numeric: false, disablePadding: false, label: 'Brand' },
    { id: 'model', numeric: false, disablePadding: false, label: 'Model' },
    { id: 'equipment', numeric: false, disablePadding: false, label: 'Equipment' },
    { id: 'appearance', numeric: false, disablePadding: false, label: 'Appearance' },
    { id: 'password', numeric: false, disablePadding: false, label: 'Password' },
    { id: 'defect', numeric: false, disablePadding: false, label: 'Defect' },
    { id: 'receiverNotes', numeric: false, disablePadding: false, label: 'Receiver notes' },
    { id: 'estimatedPrice', numeric: false, disablePadding: false, label: 'Estimated price' },
    // { id: 'manager', numeric: false, disablePadding: false, label: 'Manager' },
    // { id: 'executor', numeric: false, disablePadding: false, label: 'Executor' },
];

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {rows.map(
                        row => (
                            <TableCell
                                key={row.id}
                                align={row.numeric ? 'right' : 'left'}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        ),
                        this,
                    )}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
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
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
        marginRight: '10px'
    },
    addOrderButton: {
        marginLeft: '10px'
    },
});

let EnhancedTableToolbar = props => {
    const { numSelected, classes, onClickAddOrderButton } = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography variant="h6" >
                        Orders
                        <IconButton onClick={onClickAddOrderButton} className={classes.addOrderButton} color="primary" component="span">
                            <OrderAddIcon />
                        </IconButton>
                    </Typography>
                )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 &&
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                }
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
        // width: '100%',
        margin: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class EnhancedTable extends React.Component {

    render() {
        const {data} = this.props;

        const { classes } = this.props;
        const {order, orderBy, selected, rowsPerPage, page } = this.props;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);



        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    onClickAddOrderButton={this.props.onClickAddOrderButton}
                />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.props.handleSelectAllClick}
                            onRequestSort={this.props.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {stableSort(data, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    const isSelected = this.props.isSelected(n.id);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.props.handleClick(event, n.id)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isSelected} />
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="none">
                                                {n.orderType.name}
                                            </TableCell>
                                            <TableCell align="left">{n.client.name}</TableCell>
                                            <TableCell align="left">{n.deviceType.name}</TableCell>
                                            <TableCell align="left">{n.imei}</TableCell>
                                            <TableCell align="left">{n.brand}</TableCell>
                                            <TableCell align="left">{n.model}</TableCell>
                                            <TableCell align="left">{n.equipment}</TableCell>
                                            <TableCell align="left">{n.appearance}</TableCell>
                                            <TableCell align="left">{n.password}</TableCell>
                                            <TableCell align="left">{n.defect}</TableCell>
                                            <TableCell align="left">{n.receiverNotes}</TableCell>
                                            <TableCell align="left">{n.estimatedPrice}</TableCell>
                                            {/*<TableCell align="left">{n.manager}</TableCell>*/}
                                            {/*<TableCell align="left">{n.executor}</TableCell>*/}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.props.handleChangePage}
                    onChangeRowsPerPage={this.props.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);