import React, {Component} from 'react';
import {Link} from "react-router-dom";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import {withTheme} from "@material-ui/core";

import NavBar from "../general/NavBar";
import BottomOptions from "../general/BottomOptions";

import './Verify.scss'
import Timer from "../general/Timer";
import {
    submitPhoneNumberAgain,
    submitVerificationCode,
    verifyFormLoaded,
    smsNonceResendTimeout,
} from "../api/AuthActions";

import {connect} from "react-redux";

const LENGTH_VERIFICATION_CODE = 6;
const SEND_AGAIN_TIME = 45;

const mapStateToProps = (state) => {
    return {
        phoneNumber: state.session.phoneNumber,
        smsRequestSentAgain: state.session.smsRequestSentAgain,
        authenticating: state.session.authenticating,
        authenticated: state.session.authenticated,
        error: state.session.errorAuth,
    }
};

const mapDispatchToProps = {
    verifyFormLoaded,
    submitVerificationCode,
    submitPhoneNumberAgain,
    smsNonceResendTimeout,
};

class Verify extends Component {
    constructor(props) {
        super(props);

        this.state = {
            verificationCode: '',
            sendAgainTimeout: 0,
        };
    }

    componentDidMount() {
        this.props.verifyFormLoaded();
    }

    handleOnChange(e) {
        const onlyDigits0to9 = /^[0-9\b]+$/;
        if (((e.target.value === '') || onlyDigits0to9.test(e.target.value)))
        {
            this.setState({
                'verificationCode': e.target.value
            });
        }
    }

    handleOnSendAgainPress() {
        this.setState({
            sendAgainTimeout: SEND_AGAIN_TIME
        });
        this.props.submitPhoneNumberAgain(this.props.phoneNumber);
    }

    handleOnVerifyPress() {
        this.props.submitVerificationCode(this.props.phoneNumber, this.state.verificationCode);
    }

    handleTimeoutTick() {
        this.setState({
            sendAgainTimeout: this.state.sendAgainTimeout-1
        });

        if (this.state.sendAgainTimeout === 0) {
            this.props.smsNonceResendTimeout();
        }
    }

    render() {
        const { nextLink } = this.props;
        const { pathname } = this.props.location;

        const LinkToPayment = props => <Link to={nextLink} {...props} />;

        // Verify Button
        let disabledVerify = false;
        let verifyButtonThemeColor = "primary";
        let verifyButtonText = "Verify now";
        if (this.props.authenticating) {
            verifyButtonThemeColor = "secondary";
            verifyButtonText = "Verifying...";
            disabledVerify = true;
        }
        if (this.props.authenticated) {
            verifyButtonThemeColor = "secondary";
            verifyButtonText = "Verified!";
            disabledVerify = true;
        }

        // Step definition based on origin page
        let step = 0;
        let backTo = '/Orders/AuthPhone';
        if (pathname.startsWith('/Order/')) {
            step = 2;
            backTo = '/Order/Details';
        }

        return (
            <div className="AppScreen VerifyPhoneNumber">
                <NavBar title="Verify your number" backTo={backTo} step={step} />
                <div className="Content">
                    <div className="IntroText">We have sent you a code to the number <strong>{this.props.phoneNumber}</strong>. Please retrieve the code and enter it below.</div>
                    <div className="CodeEntry">
                        <TextField error={(this.props.error !== null) && !this.props.authenticated}
                                   disabled={this.props.authenticating || this.props.authenticated}
                                   placeholder={ String.prototype.padStart(LENGTH_VERIFICATION_CODE, '0') }
                                   autoFocus={true}
                                   value={this.state.verificationCode}
                                   onChange={this.handleOnChange.bind(this)}
                                   InputProps={{
                                       style: {
                                           fontSize: 1.5 + 'rem',
                                           textAlign: 'center',
                                           width: '100%'
                                       }
                                   }}
                        />
                    </div>
                    <div className="VerifyButtonContainer">
                        <Button fullWidth
                                style={ this.props.authenticated ? {textTransform: 'none', backgroundColor:'#e7f6ea'} : {textTransform: 'none'}}
                                className="Button"
                                variant="contained"
                                color={verifyButtonThemeColor}
                                disabled={disabledVerify}
                                onClick={this.handleOnVerifyPress.bind(this)}
                        >
                            {verifyButtonText}
                        </Button>
                        <div className="SendAgainText">
                            <div style={{display: 'inline'}}>
                                Didn't get the code?
                            </div>
                            <div>
                                <Button
                                        style={ {textTransform: 'none'}}
                                        color="primary"
                                        variant="text"
                                        onClick={this.handleOnSendAgainPress.bind(this)}
                                        disabled={
                                            this.props.smsRequestSentAgain ||
                                            this.props.authenticating ||
                                            this.props.authenticated
                                        }
                                >
                                    {this.state.sendAgainTimeout > 0 ?
                                        <Timer preText={'Sent - '}
                                               tickHandler={this.handleTimeoutTick.bind(this)}
                                               secondsToShow={this.state.sendAgainTimeout}/> :
                                        'Send again.'
                                    }
                                </Button>
                            </div>
                        </div>
                    </div>
                    { (this.props.error && !this.props.authenticated) &&
                    <div className="SubTextError">
                        Error while trying to send request. Please check the Code and your connection and try again.
                    </div>
                    }
                </div>
                <BottomOptions>
                    <Button fullWidth
                            disabled={ !this.props.authenticated }
                            className="Button"
                            variant="contained"
                            color="primary"
                            component={LinkToPayment}
                    >
                        Continue
                    </Button>
                </BottomOptions>
            </div>
        );
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTheme()(Verify));