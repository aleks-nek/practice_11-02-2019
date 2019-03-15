import React, {Component} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Route, Router} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import {connect} from 'react-redux';
import {loadCurrentUser} from './actions/user';

import './App.css';
import Header from './containers/HeaderContainer';
import Root from './containers/root';
import Home from './containers/home';
import Clients from './containers/ClientsContainer';
import Orders from './containers/OrdersContainer';
import SignUp from './containers/SignUpContainer';
import SignIn from './containers/SignInContainer';
import Notification from './components/Notification';

const history = createBrowserHistory();


class App extends Component {

    componentDidMount(){
        if(!this.props.user.isAuthenticated){
            this.props.onLoadUser();
        }
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
                    <Route path="/orders"   component = {Orders} />
                    <Route path="/signin"   component = {SignIn} />
                    <Route path="/signup"   component = {SignUp} />
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