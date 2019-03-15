import {getCompanyClients} from '../util/APIUtils';
import {saveClient} from "../util/APIUtils";
import {showNotification} from "./notification";

export const addCompanyClientsInStore = (clients) => {
    return {
        type: 'ADD_CLIENTS_IN_STORE',
        payload: clients
    }
};

export const fetchCompanyClientsData = () => dispatch =>  {
    getCompanyClients()
        .then(res => {
            dispatch(addCompanyClientsInStore(res.data));
        })
        .catch(err => {
            console.error('--- on load company clients', err)
        })
};

export const saveCompanyClient = (client) => dispatch => {
    saveClient(client)
        // в ответе вернется client, НО уже с id
        .then(res => {
            dispatch(fetchCompanyClientsData());
            dispatch(showNotification('Client was saved.'));
        })
        .catch(err => {
            console.error('---saveCompanyClient', err)
        })

};