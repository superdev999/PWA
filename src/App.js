import React from 'react';
import { connect } from 'react-redux'
import {Route, Switch, Redirect } from 'react-router-dom';

import { MuiThemeProvider } from '@material-ui/core/styles';

import Start from './main/start';
import Theme from './Theme.js'

import './App.scss'
import AuthNormal from "./Auth/AuthNormal";
import Verify from "./Auth/Verify";
import ListPend from "./Job/ListPend";
import JobDetails from "./Job/JobDetails";

const mapStoreToProps = (store) => {
    return {
        product: store.product,
        orderDetails: store.orderDetails,
        paymentDetails: store.paymentDetails
    };
};


class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={Theme}>
                <div className="AppTop">
                    <Switch>
                        { /* Home */ }
                        <Route exact path="/" component={Start}/>

                        <Route exact path="/Auth/Details"
                               render={(props) =>
                                   <AuthNormal {...props}
                                               nextLink="/Auth/Verify"  />}
                        />
                        <Route exact path="/Auth/Verify"
                               render={(props) =>
                                   <Verify {...props}
                                           nextLink="/Job/ListPend"  />
                        }
                        />
                        <Route exact path="/Job/ListPend"
                               render={(props) =>
                                   <ListPend {...props} />}
                        />
                        <Route exact path="/Job/Details"
                               render={(props) =>
                                   <JobDetails {...props} />}
                        />
                        { /* Catch unhandled routes */ }
                        <Route><Redirect to="/"/></Route>
                    </Switch>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default connect(mapStoreToProps)(App);