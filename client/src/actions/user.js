import {getCurrentUser} from "../util/APIUtils";

export const loadCurrentUser = () => dispatch => {
    dispatch({type: 'TOGGLE_LOADING_USER_INDICATOR'});

    getCurrentUser()
        .then(res => {
            dispatch({type: 'ADD_USER_IN_STORE', payload: {user: res.data} });
            dispatch({type: 'AUTHENTICATION_USER_SUCCESS'});
            dispatch({type: 'TOGGLE_LOADING_USER_INDICATOR'});
        })
        .catch(err => {
            console.log('---err in method loadCurrentUser: ', err);
            dispatch({type: 'TOGGLE_LOADING_USER_INDICATOR'});
        });
};