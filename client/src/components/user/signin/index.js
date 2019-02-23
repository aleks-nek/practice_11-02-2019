import React, {Component} from 'react';
import {authentication} from "../../../util/APIUtils";
import {connect} from 'react-redux';

import SignInForm from './signInForm';
import './index.css';
import {ACCESS_TOKEN} from "../../../constants";

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
                    localStorage.setItem(ACCESS_TOKEN, res.data.token);
                    this.props.history.push('/');
                    this.props.showNotification('Login successful.');
                }
            })
            .catch(err => {
                this.props.showNotification('Login successful.');
                console.log('---', err);
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
        }
    })
)(SignIn);

//export default Signup;