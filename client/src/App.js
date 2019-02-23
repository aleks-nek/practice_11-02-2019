import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import {connect} from 'react-redux';

import Header from './components/header';
import SignUp from './components/user/signup';
import SignIn from './components/user/signin';
import Notification from './components/notification';

const Home = () => (
    <div>
        <p>Home page</p>
        <a href="/signin">Sign in</a><br />
        <a href="/signup">Sign up</a>
    </div>
);

const history = createBrowserHistory();

class App extends Component {
    render() {
        return (
            <BrowserRouter history={history}>
                <section>
                    <Header />
                    <Route exact path="/" component = {Home} />
                    <Route path="/signin" component = {SignIn} />
                    <Route path="/signup" component = {SignUp} />
                    <Notification />
                </section>
            </BrowserRouter>
        );
    }
}
export default connect(
    state => ({
        state
    })
)(App);

// export default App;
