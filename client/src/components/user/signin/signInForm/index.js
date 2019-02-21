import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {
    MIN_LOGIN_LENGTH, MAX_LOGIN_LENGTH,
    MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH
} from "../../../../constants";

import './index.css';

class RegistrationForm extends Component{

    constructor(props){
        super(props);

        this.state = {
            login:{
                value:''
            },
            password:{
                value:''
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onClickSubmitButton = this.onClickSubmitButton.bind(this);
    }
    onClickSubmitButton = () => {

        let credentials = {
            login: this.state.login.value,
            password: this.state.password.value,
        };

        this.props.handleSubmitButton(credentials);
    };

    handleInputChange = (event, validateFunction) => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        const validation = validateFunction(inputValue);

        this.setState({
            [inputName]:{
                value: inputValue,
                err: validation.err
            }
        });
    };

    isNotValidForm = () => {
        let fields = this.state;
        let isNotValidLogin = fields.login.err || fields.login.err === undefined;
        let isNotValidPassword = fields.password.err || fields.password.err  === undefined;

        return (isNotValidLogin ||
                isNotValidPassword
        );
    };

    render(){

        const fields = this.state;

        return (
            <div>
                <Paper id="registration-form" elevation={0}>

                    <Typography id="form-header" variant="h5" component="h3">
                        Sign In
                    </Typography>

                    <TextField
                        id="login-textfield"
                        label="Login"
                        name="login"
                        placeholder="Your login"
                        error={fields.login.err}
                        onChange={(event) => {this.handleInputChange(event, this.validateLogin)}}
                        margin="dense"
                        variant="outlined"
                    />

                    <TextField
                        id="password-textfield"
                        label="Password"
                        name="password"
                        placeholder="Your password"
                        type="password"
                        error={fields.password.err}
                        onChange={(event) => {this.handleInputChange(event, this.validatePassword)}}
                        margin="dense"
                        variant="outlined"
                    />

                    <Button onClick={this.onClickSubmitButton} disabled={this.isNotValidForm()} id="submit-button" variant="contained" color="primary">
                        Sign In
                    </Button>

                    <Typography variant="caption" gutterBottom>
                        Or <a href="/signup">register now!</a>
                    </Typography>
                </Paper>
            </div>
        )
    };

    validateLogin = (login) => {

        const LOGIN_REGEX = RegExp('^[a-zA-Z1-9]+$');
        if(!LOGIN_REGEX.test(login)){
            return {
                err: true,
                errorMessage: 'Login contains invalid characters.'
            }
        }

        if(login.length < MIN_LOGIN_LENGTH){
            return {
                err: true,
                errorMessage: `Minimum login length is ${MIN_LOGIN_LENGTH}.`
            }
        }

        if(login.length > MAX_LOGIN_LENGTH){
            return {
                err: true,
                errorMessage: `Maximum login length is ${MAX_LOGIN_LENGTH}.`
            }
        }

        return {
            err: false,
            errorMessage: null
        }
    };

    validatePassword = (password) => {
        if(password.length < MIN_PASSWORD_LENGTH){
            return {
                err: true,
                errorMessage: `Password length cannot be less than ${MIN_PASSWORD_LENGTH} symbols.`
            }
        }

        if(password.length > MAX_PASSWORD_LENGTH){
            return {
                err: true,
                errorMessage: `Password length cannot be more than ${MAX_PASSWORD_LENGTH} symbols.`
            }
        }

        return {
            err: false,
            errorMessage: null
        }
    }
}

export default RegistrationForm;
// export default withStyles(styles)(PaperSheet);