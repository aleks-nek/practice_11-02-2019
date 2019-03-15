import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import {MAX_EMAIL_LENGTH, MAX_NAME_LENGTH, MIN_NAME_LENGTH, MAX_ADDRESS_LENGTH} from "../../constants";

const styles = theme => ({
    addClientFormWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        minWidth: '400px',
        padding: '20px',
    },
    formItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '350px',
        marginTop: '30px',
        marginRight: '30px',
    },
    propertyInput: {
        width: '250px',
        marginLeft: '10px',
    },
    saveButton: {
        marginRight: '5px',
    }
});


class RightDrawer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isConflicted: false,
            name:{
                value: null
            },
            phone:{
                value: null
            },
            email:{
                value: null
            },
            address: {
                value: null
            },
            comment: {
                value: null
            }
        }
    }

    render() {
        const {classes, toggleDrawer, isOpen} = this.props;

        return (
            <div>
                <Drawer anchor="right" open={isOpen} onClose={toggleDrawer}>
                    <div className={classes.addClientFormWrapper}>

                        <div className={classes.formItem}>
                            <Typography variant="h6">
                                New client
                            </Typography>
                        </div>

                        <div className={classes.formItem}>
                            <InputLabel htmlFor="name-input">Name</InputLabel>
                            <Input
                                required
                                id='name-input'
                                name='name'
                                className={classes.propertyInput}
                                onChange={event => this.handleInputChange(event, this.validateName)}
                                error={this.state.name.err}
                            />
                        </div>

                        <div className={classes.formItem}>
                            <InputLabel htmlFor="phone-input">Phone</InputLabel>
                            <Input
                                required
                                id='phone-input'
                                name='phone'
                                className={classes.propertyInput}
                                onChange={event => this.handleInputChange(event, this.validatePhone)}
                                error={this.state.phone.err}
                            />
                        </div>

                        <div className={classes.formItem}>
                            <InputLabel htmlFor="email-input">Email</InputLabel>
                            <Input
                                name='email'
                                id='email-input'
                                className={classes.propertyInput}
                                onChange={event => this.handleInputChange(event, this.validateEmail)}
                                error={this.state.email.err}
                            />
                        </div>

                        <div className={classes.formItem}>
                            <InputLabel htmlFor="address-input">Address</InputLabel>
                            <Input
                                name='address'
                                id='address-input'
                                className={classes.propertyInput}
                                onChange={event => this.handleInputChange(event, this.validateAddress)}
                                error={this.state.address.err}
                            />
                        </div>

                        <div className={classes.formItem}>
                            <InputLabel htmlFor="comment-input">Comment</InputLabel>
                            <Input
                                name='comment'
                                id='comment-input'
                                className={classes.propertyInput}
                                onChange={event => this.handleInputChange(event, this.validateComment)}
                                error={this.state.comment.err}
                            />
                        </div>

                        <div className={classes.formItem}>
                            <div>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.isConflicted}
                                            onChange={this.handleChangeCheckBox}
                                            color = 'primary'
                                        />
                                    }
                                    label="Conflicted"
                                />
                            </div>
                        </div>

                        <div className={classes.formItem}>
                            <div>
                                <Button onClick={this.handleSaveButton} disabled={this.isNotValidForm()} className={classes.saveButton} variant="contained" color="primary">
                                    Save
                                </Button>
                                <Button onClick={toggleDrawer} variant="contained" color="secondary">
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </Drawer>
            </div>
        );
    }

    isNotValidForm = () => {
        let fields = this.state;

        let isNotValidName = fields.name.err || fields.name.err === undefined;
        let isNotValidPhone = fields.phone.err || fields.phone.err === undefined;
        let isNotValidEmail = fields.email.err;
        let isNotValidAddress = fields.address.err;
        let isNotValidComment = fields.comment.err;

      return isNotValidName ||
          isNotValidPhone ||
          isNotValidEmail ||
          isNotValidAddress ||
          isNotValidComment;
    };

    handleSaveButton = () => {
        let c = this.state;

        let client = {
            name: c.name.value,
            phone: c.phone.value,
            email: c.email.value,
            address: c.address.value,
            comment: c.comment.value,
            isConflicted: c.isConflicted
        };

        this.props.onClickSaveClientButton(client);
    };

    handleChangeCheckBox = () => {
        let c = this.state.isConflicted;

        this.setState({
            isConflicted: !c
        })
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

    validateName = (name) => {
        const NAME_REGEX = RegExp('^[a-zA-ZА-яа-я, \\s]+$');
        if(!NAME_REGEX.test(name)){
            return {
                err: true
            }
        }

        if(name.length < MIN_NAME_LENGTH){
            return {
                err: true
            }
        }

        if(name.length > MAX_NAME_LENGTH){
            return {
                err: true,
            }
        }

        return {
            err: false
        }
    };

    validatePhone = (phone) => {
        const PHONE_REGEX = RegExp('^[0-9, +, (, ), -]+$');

        if(!PHONE_REGEX.test(phone)){
            return {
                err: true
            }
        }

        return {
            err: false
        }
    };

    validateEmail = (email) => {
        if(!email){
            return {
                err: true,
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if(!EMAIL_REGEX.test(email)) {
            return {
                err: true,
            }
        }

        if(email.length > MAX_EMAIL_LENGTH){
            return {
                err: true,
            }
        }

        return {
            err: false,
        }
    };

    validateAddress = (address) => {
        if(address.length > MAX_ADDRESS_LENGTH){
            return {
                err: true
            }
        }

        return {
            err: false
        }
    };

    validateComment = (comment) => {
        if(comment.length > MAX_ADDRESS_LENGTH){
            return {
                err: true
            }
        }

        return {
            err: false
        }
    }
}

export default withStyles(styles)(RightDrawer);