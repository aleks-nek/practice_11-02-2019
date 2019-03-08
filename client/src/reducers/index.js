import {combineReducers} from 'redux';

import user from './user';
import notification from './notification';
import client from './clients';

export default combineReducers({
    user,
    notification,
    client
});