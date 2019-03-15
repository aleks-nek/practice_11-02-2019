const initialState = [];

export default function deviceTypes(state = initialState, action) {
    if(action.type === 'ADD_DEVICE_TYPES_IN_STORE') {
        return action.payload;
    }

    return state;
}