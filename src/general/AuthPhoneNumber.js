import React, {Component} from 'react';
import NavBar from "./NavBar";
import './AuthPhoneNumber.scss'

class AuthPhoneNumber extends Component {
  render() {
    return (
      <div className="AppScreen AuthPhoneNumber">
        <NavBar title="Retrieve Order" backTo="/" step={0} />
        <div className="Content VerifyPhoneNumber">
          <TextInput label="(e.g. +97123141232)" placeholder="Order Phone Number" />
          <div>
            We will send a text with a verification code to this number, which you can use to verify in the next step.
          </div>
        </div>
        <div className="BottomOptions">
          <Button title="Receive code" linkTo="/Orders/AuthCode" buttonType={Button.ButtonTypes.cta} />
        </div>
      </div>
    );
  }
}

export default AuthPhoneNumber;