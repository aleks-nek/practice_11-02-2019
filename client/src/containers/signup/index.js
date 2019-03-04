import React, {Component} from 'react';
import {registration} from "../../util/APIUtils";
import {getCountries} from "../../util/APIUtils";
import {connect} from 'react-redux';

import SignInForm from '../../components/forms/signUpForm';
import './index.css';
import {ACCESS_TOKEN} from "../../constants";

class Signup extends Component {
    constructor(props){
        super(props);

        this.state = {
            countries: []
        }
    }

    componentDidMount() {
        getCountries()
            .then((res)=>{
                this.setState({countries: res.data});
            })
            .catch((err)=>{
                console.log('---err in getCountries', err);
            })
    }

    render(){
        return(
            <div id={"sign-up-body"}>
                <SignInForm
                    handleSubmitButton={this.handleSubmitButton}
                    countries={this.state.countries}
                />
            </div>
        );
    }

    handleSubmitButton = (employee) => {
        registration(employee)
            .then(res => {
                if(res.status === 200){
                    localStorage.setItem(ACCESS_TOKEN, res.data.token);
                    this.props.onSuccessAuthenticationUser();
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
        },
        onSuccessAuthenticationUser: (user) => {
            dispatch({type: 'AUTHENTICATION_USER_SUCCESS', payload: {user} });
        },
    })
)(Signup);