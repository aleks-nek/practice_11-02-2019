import {combineReducers} from 'redux';

import user from './user';
import notification from './notification';
import clients from './clients';
import orders from './orders';
import orderTypes from './orderTypes';
import deviceTypes from './deviceTypes'

export default combineReducers({
    user,
    notification,
    clients,
    orders,
    orderTypes,
    deviceTypes
});