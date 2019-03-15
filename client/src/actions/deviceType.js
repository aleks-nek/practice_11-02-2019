import {getDeviceTypes} from "../util/APIUtils";

export const addDeviceTypesInStore = (deviceTypes) => {
    return {
        type: 'ADD_DEVICE_TYPES_IN_STORE',
        payload: deviceTypes
    }
};

export const fetchDeviceTypesData =() => dispatch =>{
    getDeviceTypes()
        .then(res => {
            dispatch(addDeviceTypesInStore(res.data));
        })
        .catch(err => {
            console.log('---fetchDeviceTypesData error', err);
        })
};