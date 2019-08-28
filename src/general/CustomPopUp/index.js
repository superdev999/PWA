import './style.scss'
import React, {Component} from 'react';
import checkIcon from '../CustomListView/images/checkIcon.png'
import FinishIcon from '../CustomListView/images/ic-confirmationcircle.png'

class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setOk: 0
        };
    }

    linkHome = () => {
        clearInterval(this.timer);
        this.props.confirmDone();
    };

    handleSet = () => {
        this.setState({
            setOk: 1
        });
        this.timer = setTimeout(this.linkHome, 3000);
    };

    render() {
        if (this.state.setOk) {
            return (
                <div className="Popup">
                    <div className="popupIn">
                        <div className="Card">
                            <div className="Title" style={{padding: '34px'}}>
                                <img src={FinishIcon} style={{width: '5em', marginLeft: '35%'}}/>
                                <p style={{textAlign: 'center', fontSize: '18px', fontFamily: 'Robot-Regular'}}>Good
                                    job! The customer has been notified.</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="Popup">
                    <div className="popupIn">
                        <div className="Card">
                            <div className="Title">
                                <p>Mark as done?</p>
                                <label>This will notify the customer. Please make sure you checked the below.</label>
                            </div>
                            <div className="Body">
                                <ul>
                                    <li>
                                        <img src={checkIcon} style={{width: '1em'}}/>
                                        <label>All car parts are clean?</label>
                                    </li>
                                    <li>
                                        <img src={checkIcon} src={checkIcon} style={{width: '1em'}}/>
                                        <label>Collected all cleaning supplies?</label>
                                    </li>
                                    <li>
                                        <img src={checkIcon} src={checkIcon} style={{width: '1em'}}/>
                                        <label>Make sure susrrounding cars a clean.</label>
                                    </li>
                                </ul>
                            </div>
                            <div className="connectBt">
                                <a onClick={this.props.closePopup}>Cancel</a>
                                <a onClick={this.handleSet}>Yes, notify customer</a>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Popup