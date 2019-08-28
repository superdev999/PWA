import {createReducer} from "redux-starter-kit";
import {SessionType} from "./ApiTypes";

import {
    SESSION_SMS_NONCE_FULFILLED,
    SESSION_SMS_NONCE_PENDING,
    SESSION_SMS_NONCE_REJECTED,
    SESSION_VERIFYCODE_LOADED,
    SESSION_SMS_NONCE_RESEND_TIMEOUT,
    SESSION_SMS_AUTH_FULFILLED,
    SESSION_SMS_AUTH_PENDING,
    SESSION_SMS_AUTH_REJECTED, SESSION_SMS_NONCE_REQUESTED_AGAIN,
} from "./AuthActions";

export default createReducer(
    {...SessionType},
    {
        [SESSION_SMS_NONCE_PENDING]: (state, action) =>
            ({...state, sending: true, phoneNumber: action.payload}),
        [SESSION_SMS_NONCE_FULFILLED]: (state) =>
            ({...state, sending: false, smsRequestSent: true}),
        [SESSION_SMS_NONCE_REJECTED]: (state, action) =>
            ({...state, sending: false, error: action.payload}),
        [SESSION_VERIFYCODE_LOADED]: (state) =>
            ({
                ...state,
                authenticating: false,
                authenticated: false,
                smsRequestSent: false,
                smsRequestSentAgain: false,
                error: null,
                errorAuth: null,
                token: null
            }),
        [SESSION_SMS_NONCE_RESEND_TIMEOUT]: (state) =>
            ({...state, smsRequestSentAgain: false}),
        [SESSION_SMS_NONCE_REQUESTED_AGAIN]: (state) =>
            ({...state, smsRequestSentAgain: true}),
        [SESSION_SMS_AUTH_PENDING]: (state) =>
            ({...state, authenticating: true}),
        [SESSION_SMS_AUTH_FULFILLED]: (state, action) =>
            ({...state, authenticating: false, authenticated: true, token: action.payload}),
        [SESSION_SMS_AUTH_REJECTED]: (state, action) =>
            ({...state, authenticating: false, errorAuth: action.payload}),
    }
);