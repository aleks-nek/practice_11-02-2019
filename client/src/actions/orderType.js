import {getOrderTypes} from "../util/APIUtils";

export const addOrderTypesInStore = (orderTypes) =>{
    return {
        type: 'ADD_ORDER_TYPES_IN_STORE',
        payload: orderTypes
    }
};

export const fetchOrderTypesData = () => dispatch =>{
    getOrderTypes()
        .then(res => {
            dispatch(addOrderTypesInStore(res.data));
        })
        .catch(err => {
            console.log('---fetchOrderTypesData error', err);
        })
};