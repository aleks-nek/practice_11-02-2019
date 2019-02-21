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
                    this.props.onSuccessRegistration();
                    this.props.history.push('/');
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export default connect(
    state => ({
        state
    }),
    dispatch => ({
        onSuccessRegistration: () => {
            dispatch({type: 'AUTHENTICATION_USER_SUCCESS'});
        }
    })
)(Signup);

//export default Signup;