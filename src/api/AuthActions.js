import axios from 'axios';

import {AUTH_URL, getFullUrlForSubPath} from "./ApiConstants";
import {ResponseTypes} from './ApiTypes'

export const SESSION_SMS_NONCE_PENDING = 'SESSION_SMS_NONCE_PENDING';
export const SESSION_SMS_NONCE_FULFILLED = 'SESSION_SMS_NONCE_FULFILLED';
export const SESSION_SMS_NONCE_REJECTED = 'SESSION_SMS_NONCE_REJECTED';
export const SESSION_SMS_NONCE_REQUESTED_AGAIN = 'SESSION_SMS_NONCE_REQUESTED_AGAIN';
export const SESSION_VERIFYCODE_LOADED = 'SESSION_VERIFYCODE_LOADED';
export const SESSION_SMS_NONCE_RESEND_TIMEOUT = 'SESSION_SMS_NONCE_RESEND_TIMEOUT';
export const SESSION_SMS_AUTH_FULFILLED = 'SESSION_SMS_AUTH_FULFILLED';
export const SESSION_SMS_AUTH_PENDING = 'SESSION_SMS_AUTH_PENDING';
export const SESSION_SMS_AUTH_REJECTED = 'SESSION_SMS_AUTH_REJECTED';

export function submitPhoneNumber(phoneNumber) {
    return function (dispatch) {
        const actionPath = '/Sms/Nonce';
        const path = getFullUrlForSubPath(AUTH_URL, actionPath);

        dispatch({type: SESSION_SMS_NONCE_PENDING, payload: phoneNumber});

        axios.post(path, {
            phoneNumber: phoneNumber
        })
            .then((response) => {
                dispatch({type: SESSION_SMS_NONCE_FULFILLED, payload: response.data});
            })
            .catch((err) => {
                dispatch({type: SESSION_SMS_NONCE_REJECTED, payload: err});
            })
    };
}

export function submitPhoneNumberAgain(phoneNumber) {
    return function (dispatch) {
        const actionPath = '/Sms/Nonce';
        const path = getFullUrlForSubPath(AUTH_URL, actionPath);

        dispatch({type: SESSION_SMS_NONCE_REQUESTED_AGAIN, payload: phoneNumber});
        axios.post(path, {
            phoneNumber: phoneNumber
        })
    }
}

export function submitVerificationCode(phoneNumber, verificationCode) {
    return function (dispatch) {
        const actionPath = '/Sms';
        const path = getFullUrlForSubPath(AUTH_URL, actionPath);
        dispatch({type: SESSION_SMS_AUTH_PENDING});

        axios.post(path, {
            phoneNumber: phoneNumber,
            nonce: verificationCode
        })
            .then((response) => {
                checkResponse(response, (payload) => {
                    dispatch({type: SESSION_SMS_AUTH_FULFILLED, payload: payload.token});
                }, (payload) => {
                    dispatch({type: SESSION_SMS_AUTH_REJECTED, payload: payload});
                });
            })
            .catch((err) => {
                dispatch({type: SESSION_SMS_AUTH_REJECTED, payload: err});
            })
    };
}

export function verifyFormLoaded() {
    return function (dispatch) {
        dispatch({type: SESSION_VERIFYCODE_LOADED});
    }
}

export function smsNonceResendTimeout() {
    return function (dispatch) {
        dispatch({type: SESSION_SMS_NONCE_RESEND_TIMEOUT});
    }
}

const checkResponse = (response, success, error) => {
    if (response.data.info.status === ResponseTypes.OK_STATUS) {
        success(response.data.result);
    } else {
        error(response.data.info.status);
    }
};