import React, {Component} from 'react';
import 'react-html5-camera-photo/build/css/index.css';

import { connect } from 'react-redux';
import {Redirect} from "react-router";
import Button from '@material-ui/core/Button';
import CallIcon from "@material-ui/icons/Call";
import MuiPhoneInput from 'material-ui-phone-number';

import { submitPhoneNumber } from '../api/AuthActions'
import BottomOptions from "../general/BottomOptions";
import './AuthNormal.scss';
import alertredicon from './images/alertRedicon.png'



const mapStateToProps = (state) => {
    return {
        sending: state.session.sending,
        smsRequestSent: state.session.smsRequestSent,
        phoneNumber: state.session.phoneNumber,
        error: state.session.error,
    }
};

const mapDispatchToProps = {
    submitPhoneNumber,
};


class AuthNormal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'region':'',
            'phoneNumber':'',
            'EditState':true
        };
        this.handleOnChangePhoneNumber  = this.handleOnChangePhoneNumber.bind(this);
        this.handleOnClick              = this.handleOnClick.bind(this);
    }


    handleOnChangePhoneNumber(phoneNumber) {
        this.setState({
            'phoneNumber':phoneNumber,
            'EditState':true
        });
    }

    handleOnClick(){
        if( this.state.phoneNumber === '+9711234567'){ // it should be removed
            this.props.history.push("/Auth/Verify");
        }else{
            let phoneNumber = this.state.phoneNumber;
            this.props.submitPhoneNumber(phoneNumber);
            if( this.props.error ){
                this.setState({
                    'EditState':false
                })
            }else if( this.props.smsRequestSent ){
                this.props.history.push("/Auth/Verify");
            }
        }
    }


    render() {
        return (
                <div className="AppScreen AuthNormal">
                    <div className = "AuthHeader">
                        <label>Mist team app</label>
                        <CallIcon style={{fill:'white', float:'right'}} color="primary"/>
                    </div>
                    <div className="Content">
                        <form className="AuthNormalForm">
                            <div className="Firlabel" >
                                <label>Authentication</label>
                            </div>
                            <div className="Field FirItem">
                                <MuiPhoneInput defaultCountry='ae'
                                               preferredCountries={['ae', 'sa']}
                                               disableAreaCodes={true}
                                               value={this.state.phoneNumber}
                                               onChange={this.handleOnChangePhoneNumber.bind(this)}
                                               variant="outlined"
                                               fullWidth
                                               label="Mobile number"
                                />
                                <img className="ErrIcon" alt = "errorIcon" style={ ( !this.state.EditState || this.props.error ) ? {'display':'block'} : {'display':'none'} } src={alertredicon}/>
                                {
                                    this.props.error ? <label className="ErrComment" >Incorrect PhoneNumber</label>
                                        :<label className="ErrComment" style={ (!this.state.EditState) ? {'display':'block'} : {'display':'none'} }>Provide a vaild number</label>

                                }
                            </div>
                        </form>
                        <div className="SubText">
                            <p>We will send a text with a verification</p>
                            <p>code to this number, which you can</p>
                            <p>use to verify in the next step.</p>
                        </div>
                    </div>
                    { this.props.smsRequestSent &&
                        <Redirect push to={this.props.nextLink} />
                    }
                    <BottomOptions>
                        <Button fullWidth
                                className="Button AuthBt"
                                variant="contained"
                                color="primary"
                                disabled={false}
                                onClick={this.handleOnClick.bind(this)}
                        >
                            Request verification
                        </Button>
                    </BottomOptions>
                </div>
            )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthNormal);