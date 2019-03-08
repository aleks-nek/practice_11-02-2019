const initialState = {
    data: []
};

export default function clients(state = initialState, action) {
    if(action.type === 'ADD_CLIENTS_IN_STORE'){
        return {
            ...state,
            data: action.payload
        }
    }

    return state;
}