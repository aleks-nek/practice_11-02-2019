const initialState = {
    data: []
};

export default function orders(state = initialState, action) {
    if(action.type === 'ADD_ORDERS_IN_STORE'){
        return {
            ...state,
            data: action.payload
        }
    }

    if(action.type === 'SAVE_ORDER_IN_STORE'){
        let orders = state.data;
        orders.push(action.payload);

        return {
            ...state,
            data: orders
        }
    }

    return state;
}