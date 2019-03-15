import {getOrders} from "../util/APIUtils";
import {saveOrder} from "../util/APIUtils";
import {showNotification} from "./notification";

export const addOrdersInStore = (orders) => {
    return {
        type: 'ADD_ORDERS_IN_STORE',
        payload: orders
    }
};

export const fetchOrdersData = () => dispatch => {
    getOrders()
        .then(res => {
            dispatch(addOrdersInStore(res.data));
        })
        .catch(err => {
            console.log('---err loadOrders: ', err)
        })
};

export const saveOrderData = order => dispatch => {
    saveOrder(order)
        .then(res => {
            dispatch(fetchOrdersData());
            dispatch(showNotification('Order was saved.'));
        })
        .catch(err => {
            console.log('---saveOrderData error', err);
        })
};