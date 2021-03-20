import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Login from "../Login/Login";
import HomePage from "../HomePage/HomePage"
import GamePage from "../GamePage/GamePage"
class CustomRoute extends Component {
    render() {
        return (
            <div>
                <Router basename="/leaugex">
                    <Switch>
                        <PrivateRoute path="/home" component={HomePage} />
                        <PrivateRoute path="/game" component={GamePage} />
                        <Route path="/" component={Login} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default CustomRoute;

