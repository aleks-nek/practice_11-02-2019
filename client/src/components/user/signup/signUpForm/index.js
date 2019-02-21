import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {
    MIN_LOGIN_LENGTH, MAX_LOGIN_LENGTH,
    MIN_NAME_LENGTH, MAX_NAME_LENGTH,
    MAX_EMAIL_LENGTH,
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
            firstName:{
                value:''
            },
            lastName:{
                value:''
            },
            email:{
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

        let account = {
            login: this.state.login.value,
            password: this.state.password.value,
            profile: {
                email: this.state.email.value,
                firstName: this.state.firstName.value,
                lastName: this.state.lastName.value
            }
        };

        this.props.handleSubmitButton(account);
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
        let isNotValidFirstName = fields.firstName.err || fields.firstName.err  === undefined;
        let isNotValidLastName = fields.lastName.err || fields.lastName.err  === undefined;
        let isNotValidEmail = fields.email.err || fields.email.err  === undefined;
        let isNotValidPassword = fields.password.err || fields.password.err  === undefined;

        return (isNotValidLogin ||
                isNotValidFirstName ||
                isNotValidLastName ||
                isNotValidEmail ||
                isNotValidPassword
        );
    };

    render(){

        const fields = this.state;

        return (
            <div>
                <Paper id="registration-form" elevation={0}>

                    <Typography id="form-header" variant="h5" component="h3">
                        Sign up
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
                        id="firstname-textfield"
                        label="First Name"
                        name="firstName"
                        placeholder="Your first name"
                        error={fields.firstName.err}
                        onChange={(event) => {this.handleInputChange(event, this.validateName)}}
                        margin="dense"
                        variant="outlined"
                    />

                    <TextField
                        id="lastname-textfield"
                        label="Last Name"
                        name="lastName"
                        placeholder="Your last name"
                        error={fields.lastName.err}
                        onChange={(event) => {this.handleInputChange(event, this.validateName)}}
                        margin="dense"
                        variant="outlined"
                    />

                    <TextField
                        id="email-textfield"
                        label="Email"
                        name="email"
                        placeholder="Your email"
                        error={fields.email.err}
                        onChange={(event) => {this.handleInputChange(event, this.validateEmail)}}
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
                    {/*<Input*/}
                        {/*className="item"*/}
                        {/*placeholder="Login"*/}
                        {/*name="login"*/}
                        {/*error={fields.login.err}*/}
                        {/*onChange={(event) => {this.handleInputChange(event, this.validateLogin)}}*/}
                    {/*/>*/}
                    {/*<Input*/}
                        {/*className="item"*/}
                        {/*placeholder="First name"*/}
                        {/*name="firstName"*/}
                        {/*error={fields.firstName.err}*/}
                        {/*onChange={(event) => {this.handleInputChange(event, this.validateName)}}*/}
                    {/*/>*/}
                    {/*<Input*/}
                        {/*className="item"*/}
                        {/*placeholder="Last name"*/}
                        {/*name="lastName"*/}
                        {/*error={fields.lastName.err}*/}
                        {/*onChange={(event) => {this.handleInputChange(event, this.validateName)}}*/}
                    {/*/>*/}
                    {/*<Input*/}
                        {/*className="item"*/}
                        {/*placeholder="E-mail"*/}
                        {/*name="email"*/}
                        {/*error={fields.email.err}*/}
                        {/*onChange={(event) => {this.handleInputChange(event, this.validateEmail)}}*/}
                    {/*/>*/}
                    {/*<Input*/}
                        {/*className="item"*/}
                        {/*placeholder="Password"*/}
                        {/*name="password"*/}
                        {/*error={fields.password.err}*/}
                        {/*onChange={(event) => {this.handleInputChange(event, this.validatePassword)}}*/}
                    {/*/>*/}

                    <Button onClick={this.onClickSubmitButton} disabled={this.isNotValidForm()} id="submit-button" variant="contained" color="primary">
                        Register
                    </Button>

                    <Typography variant="caption" gutterBottom>
                        Already registered? <a href="/login">Login now!</a>
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

    validateName = (name) => {

        const NAME_REGEX = RegExp('^[a-zA-Z]+$');
        if(!NAME_REGEX.test(name)){
            return {
                err: true,
                errorMessage: 'Name contains invalid characters'
            }
        }

        if(name.length < MIN_NAME_LENGTH){
            return {
                err: true,
                errorMessage: `Minimum name length is ${MIN_NAME_LENGTH}.`
            }
        }

        if(name.length > MAX_NAME_LENGTH){
            return {
                err: true,
                errorMessage: `Maximum name length is ${MAX_NAME_LENGTH}.`
            }
        }

        return {
            err: false,
            errorMessage: null
        }
    };

    validateEmail = (email) => {
        if(!email){
            return {
                err: true,
                errorMessage: 'Email can\'t be empty.'
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if(!EMAIL_REGEX.test(email)) {
            return {
                err: true,
                errorMessage: 'Email not valid.'
            }
        }

        if(email.length > MAX_EMAIL_LENGTH){
            return {
                err: true,
                errorMessage: 'Email address length cannot be more than 254 symbols.'
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