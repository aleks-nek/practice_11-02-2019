import React, {Component} from 'react';
import { withStyles } from "@material-ui/core/styles";
import {connect} from 'react-redux';

import SignUpForm from '../components/forms/SignUpForm';
import {ACCESS_TOKEN} from "../constants";
import {registration} from "../util/APIUtils";
import {getCountries} from "../util/APIUtils";
import {loadCurrentUser} from "../actions/user";
import {showNotification} from "../actions/notification";

const styles = {
    signUpBody: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    }
};

class SignUpContainer extends Component {
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
        const { classes } = this.props;

        return(
            <div className={classes.signUpBody}>
                <SignUpForm
                    handleSubmitButton={this.handleSubmitButton}
                    countries={this.state.countries}
                />
            </div>
        );
    }

    handleSubmitButton = (account) => {
        registration(account)
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
            dispatch(showNotification(msg));
        },
        onSuccessAuthenticationUser: () => {
            dispatch(loadCurrentUser());
        },
    })
)(withStyles(styles)(SignUpContainer));