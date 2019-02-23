import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import {connect} from "react-redux";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class Notification extends React.Component {

    handleClose = () => {
        this.props.onCloseNotification();
    };

    render() {
        const { vertical, horizontal, open } = this.props.notification;
        return (
            <div>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={this.handleClose}
                    message={this.props.notification.message}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}

export default connect(
    state => ({
        notification: state.notification
    }),
    dispatch => ({
        onCloseNotification: () => {
            dispatch({type: 'HIDE_NOTIFICATION'});
        }
    })
)(Notification);