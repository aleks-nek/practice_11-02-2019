export const showNotification = (msg) => dispatch =>{
    dispatch({type: 'SHOW_NOTIFICATION', payload: {message: msg}});
};