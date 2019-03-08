import React, {Component} from 'react';
import {connect} from 'react-redux';

import './index.css';
import ClientsTable from '../../components/clients/table';
import {loadCompanyClients} from '../../actions/client';

class Clients extends Component{
    componentDidMount() {
        console.log('Clients -> componentDidMount()');
        this.props.onLoadCompanyClients();
    }

    render() {
        return(
            <div id='table-wraper'>
                <ClientsTable
                    data={this.props.clients}
                    onClickAddClientButton={this.onClickAddClientButton}
                />
            </div>
        );
    }

    onClickAddClientButton = () => {
        console.log('---onClickAddClientButton');
    }
}

export default connect(
    state => ({
        clients: state.client.data
    }),
    dispatch => ({
        onLoadCompanyClients: () => {
            dispatch(loadCompanyClients())
        }
    })
)(Clients)