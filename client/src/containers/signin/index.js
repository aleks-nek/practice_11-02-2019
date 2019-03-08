import React, {Component} from 'react';
import {authentication} from "../../util/APIUtils";
import {loadCurrentUser} from '../../actions/user';
import {connect} from 'react-redux';

import SignInForm from '../../components/forms/signInForm';
import './index.css';
import {ACCESS_TOKEN} from "../../constants";

class SignIn extends Component {

    render(){
        return(
            <div id={"sign-in-body"}>
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
            dispatch({type: 'SHOW_NOTIFICATION', payload: {message: msg}});
        },
        onSuccessAuthenticationUser: () => {
            dispatch(loadCurrentUser());
        },
    })
)(SignIn);