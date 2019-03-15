const initialState = [];

export default function orderTypes(state = initialState, action) {
    if(action.type === 'ADD_ORDER_TYPES_IN_STORE') {
        return action.payload;
    }

    return state;
}