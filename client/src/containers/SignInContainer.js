import React, {Component} from 'react';
import { withStyles } from "@material-ui/core/styles";
import {connect} from 'react-redux';

// import './index.css';
import SignInForm from '../components/forms/SignInForm';
import {authentication} from "../util/APIUtils";
import {loadCurrentUser} from '../actions/user';
import {ACCESS_TOKEN} from "../constants";
import {showNotification} from "../actions/notification";

const styles = {
    signInBody: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    }
};

class SignIn extends Component {

    render(){
        const { classes } = this.props;

        return(
            <div className={classes.signInBody}>
                <SignInForm handleSubmitButton={this.handleSubmitButton}/>
            </div>
        );
    }

    handleSubmitButton = (credentials) => {
        authentication(credentials)
            .then(res => {
                if(res.status === 200){
                    localStorage.setItem(ACCESS_TOKEN, res.data.token); console.log('-- on authentication', res);
                    this.props.onSuccessAuthenticationUser();
                    this.props.history.push('/');
                    this.props.showNotification('Login successful.');
                }
            })
            .catch(err => {
                this.props.showNotification('Login failure.');
            });
    }
}

export default connect(
    state => ({
        state
    }),
    dispatch => ({
        showNotification: (msg) => {
            dispatch(showNotification(msg));
        },
        onSuccessAuthenticationUser: () => {
            dispatch(loadCurrentUser());
        },
    })
)(withStyles(styles)(SignIn));