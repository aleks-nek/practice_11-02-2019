import React, {Component} from 'react';
import { withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '../components/header/MenuDrawer';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {connect} from 'react-redux';

import {ACCESS_TOKEN} from "../constants";

const styles = {
    root:{
        display: 'flex',
        flexGrow: '1',
    },
    grow:{
        display: 'flex',
        flexGrow: '1',
    }
};

class HeaderContainer extends Component{
    constructor(props){
        super(props);

        this.state = {
            isOpenDrawer: false
        }
    }
    render(){
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            App :)
                        </Typography>
                        {this.props.user.isAuthenticated ? (
                            <IconButton
                                aria-haspopup="true"
                                onClick={this.toggleDrawer}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        ) : (
                            <Button href='/signin' color="inherit">Sign in</Button>
                        )
                        }
                    </Toolbar>
                </AppBar>
                <Drawer
                    isOpen={this.state.isOpenDrawer}
                    toggleDrawer={this.toggleDrawer}
                    handleLogOutButton={this.handleLogOutButton}
                    redirectTo={this.redirectTo}
                />
            </div>
        )
    }

    toggleDrawer = () => {
        let isOpen = this.state.isOpenDrawer;
        this.setState({
            isOpenDrawer: !isOpen
        })
    };

    handleLogOutButton = () => {
        this.props.onUserLogOut();
        localStorage.removeItem(ACCESS_TOKEN); // TODO: Вынести!!!!!!
    };
}


export default connect(
    state => ({
        user: state.user
    }),
    dispatch => ({
        onUserLogOut: () => {
            dispatch({type: 'LOGUOT_USER'}); // TODO вынести в константы
        }
    })
)(withStyles(styles)(HeaderContainer));