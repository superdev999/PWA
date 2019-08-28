export const teamMngType = {
    teamName: "",
    teamDescription: "",
    OrderState: 'false',
    NowConduct: [],
    NewOrderList: [],
    AcceptOrderList: [],
    FinishedOrderList: [],
    DtailContent: {}
};

export const SessionType = {
    //token: null,
    token: "T671u3QFHaDNkP5ZOQCoWeNBPWjMarIDyVw-WstcYdCO4ZE9ZiM28I0bD8J9HI6_ropoNP9MGCV_mC7hAMVHhpk9ozy0Vat1BiVfB9w1YSs",//fix_me
    sending: false,
    smsRequestSent: false,
    smsRequestSentAgain: false,
    authenticating: false,
    authenticated: false,
    error: null,
    errorAuth: null,
    phoneNumber: '',
};

export const ResponseTypes = {
    OK_STATUS: 'OK',
    SMS_NONCE_INVALID: 'SMS_NONCE_INVALID',
    SMS_INVALID_PHONE_NUMBER: 'SMS_INVALID_PHONE_NUMBER',
};