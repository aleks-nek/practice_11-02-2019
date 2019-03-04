const initialState = {
    isLoading: false,
    isAuthenticated: false,
    currentUser: null
};

export default function user(state = initialState, action) {
    if(action.type === 'AUTHENTICATION_USER_SUCCESS'){
        return {
            ...state,
            isAuthenticated: true
        }
    }

    if(action.type === 'ADD_USER_IN_STORE'){
        return {
            ...state,
            currentUser: action.payload.user
        }
    }

    if(action.type === 'LOADING_USER'){
        return {
            ...state,
            isLoading: !state.isLoading
        }
    }

    if(action.type === 'LOGUOT_USER'){
        return {
            ...state,
            isAuthenticated: false,
            currentUser: null
        }
    }

    return state;
}