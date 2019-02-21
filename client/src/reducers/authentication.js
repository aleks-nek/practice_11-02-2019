const initialState = {
    isAuthenticatedUser: false
};

export default function auth(state = initialState, action) {
    if(action.type === 'AUTHENTICATION_USER_SUCCESS'){
        return {
            isAuthenticatedUser: true
        }
    }

    return state;
}