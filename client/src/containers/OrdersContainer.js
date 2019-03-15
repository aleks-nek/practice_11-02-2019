import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchOrdersData} from "../actions/order";
import {fetchOrderTypesData} from "../actions/orderType";
import {fetchCompanyClientsData} from "../actions/client";
import {fetchDeviceTypesData} from "../actions/deviceType";
import {saveOrderData} from "../actions/order";
import Table from '../components/orders/OrdersTable';
import AddNewOrderDrawer from '../components/orders/AddNewOrderDrawer';

class Orders extends Component{
    componentDidMount() {
        this.props.onLoadOrders();
        this.props.onLoadOrderTypes();
        this.props.onLoadCompanyClients();
        this.props.onLoadDeviceTypes();
    }

    state = {
        order: 'asc',
        orderBy: 'orderType',
        selected: [],
        page: 0,
        rowsPerPage: 5,

        isOpenDrawer: false,
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: this.props.orders.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    toggleDrawer = () => {
        let isOpen = this.state.isOpenDrawer;
        this.setState({
            isOpenDrawer: !isOpen
        });
    };

    handleSaveOrderButtonClick = order => {
        this.toggleDrawer();

        this.props.onSaveOrder(order);
    };

    render() {
        return(
            <div>
                <Table
                    order = {this.state.order}
                    orderBy  = {this.state.orderBy}
                    selected  = {this.state.selected}
                    page  = {this.state.page}
                    rowsPerPage  = {this.state.rowsPerPage}
                    data = {this.props.orders}

                    onClickAddOrderButton={this.toggleDrawer}
                    handleSelectAllClick = {this.handleSelectAllClick}
                    handleRequestSort = {this.handleRequestSort}
                    isSelected = {this.isSelected}
                    handleClick = {this.handleClick}
                    handleChangePage = {this.handleChangePage}
                    handleChangeRowsPerPage = {this.handleChangeRowsPerPage}
                />
                <AddNewOrderDrawer
                    isOpen = {this.state.isOpenDrawer}
                    toggleDrawer = {this.toggleDrawer}
                    onClickSaveOrderButton = {this.handleSaveOrderButtonClick}
                    clients = {this.props.clients}
                    orderTypes = {this.props.orderTypes}
                    deviceTypes = {this.props.deviceTypes}
                />
            </div>
        );
    }

}

const mapStateToProps = state => ({
    orders: state.orders.data,
    clients: state.clients.data,
    orderTypes: state.orderTypes,
    deviceTypes: state.deviceTypes,
});

const mapDispatchToProps = dispatch => ({
    onLoadOrders: () => {
        dispatch(fetchOrdersData())
    },
    onLoadOrderTypes: () => {
        dispatch(fetchOrderTypesData())
    },
    onLoadCompanyClients: () => {
        dispatch(fetchCompanyClientsData())
    },
    onLoadDeviceTypes: () => {
        dispatch(fetchDeviceTypesData())
    },
    onSaveOrder: (order) => {
        dispatch(saveOrderData(order))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (Orders);