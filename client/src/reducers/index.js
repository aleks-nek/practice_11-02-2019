import {combineReducers} from 'redux';

import auth from './authentication';
import notification from './notification';

export default combineReducers({
    auth,
    notification
});