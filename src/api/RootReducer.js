import {combineReducers} from "redux";

import AuthReducer from "./AuthReducer";
import teamMngReducer from "./teamMngReducer";

export default combineReducers(
    {
        session: AuthReducer,
        teamManage: teamMngReducer,
    }
);