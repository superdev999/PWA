import {applyMiddleware, createStore} from "redux";

import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import rootReducer from './RootReducer'

const middleware = applyMiddleware(thunk, logger, promise);

export default createStore(rootReducer, middleware);
