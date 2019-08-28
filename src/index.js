import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import CssBaseline from "@material-ui/core/CssBaseline";

import './index.css';
import './Colors.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from "react-router-dom";
import Store from "./api/Store";

ReactDOM.render(
    <Provider store={Store}>
        <React.Fragment>
            <CssBaseline />
            <Router>
                <App />
            </Router>
        </React.Fragment>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.register();