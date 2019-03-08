import {getCompanyClients} from '../util/APIUtils';

export const loadCompanyClients = () => dispatch =>  {
    getCompanyClients()
        .then(res => {
            dispatch({type:'ADD_CLIENTS_IN_STORE', payload: res.data});
        })
        .catch(err => {
            console.error('--- on load company clients', err)
        })
};