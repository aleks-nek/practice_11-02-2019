import React, {Component} from 'react';
import {connect} from 'react-redux';

import ClientsTable from '../components/clients/ClientsTable';
import ClientAddFormDrawer from '../components/clients/AddNewClientDrawer';
import {fetchCompanyClientsData, saveCompanyClient} from '../actions/client';

class Clients extends Component{
    constructor(props){
        super(props);

        this.state = {
            isOpenDrawer: false,
            clients: this.props.clients
        };
    }

    componentDidMount() {
        console.log('Clients -> componentDidMount()', this.state);
        this.props.onLoadCompanyClients();
    }

    render() {
        return(
            <div id='clients-page-wrapper'>
                <ClientsTable
                    data={this.props.clients}
                    onClickAddClientButton={this.onClickAddClientButton}
                />
                <ClientAddFormDrawer
                    isOpen={this.state.isOpenDrawer}
                    toggleDrawer={this.toggleDrawer}
                    onClickSaveClientButton={this.onClickSaveClientButton}
                />
            </div>
        );
    }

    onClickAddClientButton = () => {
        this.toggleDrawer();
    };

    onClickSaveClientButton = (client) => {
        this.toggleDrawer();

        client.company = {
            id: this.props.user.currentUser.account.employee.company.id
        };

        this.props.onSaveCompanyClient(client);
    };

    toggleDrawer = () => {
        let isOpen = this.state.isOpenDrawer;
        this.setState({
            isOpenDrawer: !isOpen
        })
    };
}

const mapStateToProps = state => ({
    clients: state.clients.data,
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    onLoadCompanyClients: () => {
        dispatch(fetchCompanyClientsData())
    },
    onSaveCompanyClient: (client) => {
        dispatch(saveCompanyClient(client))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Clients)