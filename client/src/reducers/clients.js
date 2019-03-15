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

    if(action.type === 'SAVE_CLIENT_IN_STORE'){
        let clients = state.data;
        clients.push(action.payload);

        return {
            ...state,
            data: clients
        }
    }

    return state;
}