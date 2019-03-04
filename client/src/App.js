import React, {Component} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Route, Router} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import {connect} from 'react-redux';
import {getCurrentUser} from "./util/APIUtils";

import Header from './containers/header';
import Root from './containers/root';
import Home from './containers/home';
import SignUp from './containers/signup';
import SignIn from './containers/signin';
import Settings from './containers/settings';
import Notification from './components/notification';

const history = createBrowserHistory();

class App extends Component {

    componentDidMount(){
        this.loadCurrentUser();
    }

    render() {
        const user = this.props.user;

        if(user.isLoading){
            return (
                <CircularProgress />
            );
        }

        return (
            <Router history={history}>
                <section>
                    <Header/>
                    <Route exact path="/" component = {Root} />
                    <Route path="/home" component = {Home} />
                    <Route path="/signin" component = {SignIn} />
                    <Route path="/signup" component = {SignUp} />
                    <Route path="/settings" component = {Settings} />
                    <Notification />
                </section>
            </Router>
        );
    }

    loadCurrentUser = () => {
        this.props.onLoadUser();

        getCurrentUser()
            .then(res => {
                this.props.onSuccessAuthenticationUser();
                this.props.addUserInStore(res.data);
                this.props.onLoadUser();
                // this.props.history.push('/home');
            })
            .catch(err => {
                console.log('---err in method getCurrentUser: ', err);
                this.props.onLoadUser();
            });
    };
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
            dispatch({type: 'LOADING_USER'});
        }
    })
)(App);