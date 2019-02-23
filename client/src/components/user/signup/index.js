import React, {Component} from 'react';
import {registration} from "../../../util/APIUtils";
import {connect} from 'react-redux';

import SignInForm from './signUpForm';
import './index.css';
import {ACCESS_TOKEN} from "../../../constants";

class Signup extends Component {

    render(){
        return(
            <div id={"sign-up-body"}>
                <SignInForm handleSubmitButton={this.handleSubmitButton}/>
            </div>
        );
    }

    handleSubmitButton = (account) => {
        registration(account)
            .then(res => {
                if(res.status === 200){
                    localStorage.setItem(ACCESS_TOKEN, res.data.token);
                    this.props.history.push('/');
                    this.props.showNotification('Registration success.');
                }
            })
            .catch(err => {
                this.props.showNotification('Registration failure.');
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
)(Signup);