import axios from 'axios';

import {AUTH_URL, getFullUrlForSubPath} from "./ApiConstants";
import {ResponseTypes} from './ApiTypes'

export const TEAMINFO_GET_SUCCESSFUL = 'TEAMINFO_GET_SUCCESSFUL';
export const TEAMORDERS_GET_SUCCESSFUL = 'TEAMORDERS_GET_SUCCESSFUL';
export const TEAMINFO_GET_ERROR = 'TEAMINFO_GET_ERROR';
export const SET_ORDERSTATUS_ERROR = 'SET_ORDERSTATUS_ERROR';
export const SET_RESTTIMR = 'SET_RESTTIMR';
export const RESET_NOWCONDUCT = 'RESET_NOWCONDUCT';
export const SET_NOWCONDUCT_ORDER = 'SET_NOWCONDUCT_ORDER';
export const SET_DETAILCONTENT = 'SET_DETAILCONTENT';

const BASE_URL = "Team";

export function getTeamInfo(token) {
    return function (dispatch) {
        const actionPath = `/${token}/${BASE_URL}`;
        const path = getFullUrlForSubPath(AUTH_URL, actionPath);
        axios.get(path)
            .then((response) => {
                checkResponse(response, (payload) => {
                    dispatch({type: TEAMINFO_GET_SUCCESSFUL, payload: payload});
                }, (payload) => {
                    dispatch({type: TEAMINFO_GET_ERROR, payload: payload});
                });
            })
            .catch((err) => {
                dispatch({type: TEAMINFO_GET_ERROR, payload: err});
            })
    };
}

export function getOrderForTeam(token, teamId) {
    return function (dispatch) {
        const actionPath = `/${token}/${BASE_URL}/Orders`;
        const path = getFullUrlForSubPath(AUTH_URL, actionPath);
        axios.get(path, {
            $sort:'+orderData.parktimeEnd'
        })
            .then((response) => {
                checkResponse(response, (payload) => {
                    dispatch({type: TEAMORDERS_GET_SUCCESSFUL, payload: payload});
                }, (payload) => {
                    dispatch({type: TEAMINFO_GET_ERROR, payload: payload});
                });
            })
            .catch((err) => {
                dispatch({type: TEAMINFO_GET_ERROR, payload: err});
            })
    };
}

export function setOrderState(token, orderId, orderState, teamId) {
    return function (dispatch) {
        const actionPath = `/${token}/${BASE_URL}/Orders/${orderId}/${orderState}`;
        const path = getFullUrlForSubPath(AUTH_URL, actionPath);
        axios.post(path)
            .then((response) => {
                checkResponse(response, () => {
                    dispatch({type: SET_NOWCONDUCT_ORDER, orderState});
                    dispatch(getOrderForTeam(token, teamId));
                }, () => {
                    dispatch({type: SET_ORDERSTATUS_ERROR});
                });
            })
            .catch((err) => {
                dispatch({type: SET_ORDERSTATUS_ERROR});
            })
    };
}


export const setDetailContent = (data) => ({
    type: SET_DETAILCONTENT,
    data,
});

export const setRestTime = () => ({
    type: SET_RESTTIMR
});

const checkResponse = (response, success, error) => {
    if (response.data.info.status === ResponseTypes.OK_STATUS) {
        success(response.data.result);
    } else {
        error(response.data.info.status);
    }
};