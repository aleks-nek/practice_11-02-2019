import React, {Component} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Route, Router} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import {connect} from 'react-redux';
import {loadCurrentUser} from './actions/user';

import './App.css';
import Header from './containers/header';
import Root from './containers/root';
import Home from './containers/home';
import Clients from './containers/clients';
import SignUp from './containers/signup';
import SignIn from './containers/signin';
import Settings from './containers/settings';
import Notification from './components/notification';

const history = createBrowserHistory();


class App extends Component {

    componentDidMount(){
        this.props.onLoadUser();
    }

    render() {
        const user = this.props.user;

        if(user.isLoading){
            return (
                <div id="circular-progress">
                    <CircularProgress />
                </div>
            );
        }

        return (
            <Router history={history}>
                <section>
                    <Header/>
                    <Route exact path="/"   component = {Root} />
                    <Route path="/home"     component = {Home} />
                    <Route path="/clients"  component = {Clients} />
                    <Route path="/signin"   component = {SignIn} />
                    <Route path="/signup"   component = {SignUp} />
                    <Route path="/settings" component = {Settings} />
                    <Notification />
                </section>
            </Router>
        );
    }
}
export default connect(
    state => ({
        user: state.user
    }),
    dispatch => ({
        onSuccessAuthenticationUser: () => {
            dispatch({type: 'AUTHENTICATION_USER_SUCCESS'});
        },
        addUserInStore: (user) => {
            dispatch({type: 'ADD_USER_IN_STORE', payload: {user} });
        },
        onLoadUser: () => {
            dispatch(loadCurrentUser());
        }
    })
)(App);