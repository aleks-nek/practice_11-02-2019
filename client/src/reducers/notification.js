const initialState = {
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
    message: 'init message'
};

export default function notification(state = initialState, action) {
    if(action.type === 'SHOW_NOTIFICATION'){
        return {
            ...state,
            open: true,
            message: action.payload.message
        }
    }

    if(action.type === 'HIDE_NOTIFICATION'){
        return {
            ...state,
            open: false
        }
    }

    return state;
}