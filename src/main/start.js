import React, {Component} from 'react';

import './start.scss';
import mistcombologo from './images/mistcombologo.png';

class Start extends Component {
    componentDidMount(){
        this.timer = setTimeout(this.linkHome, 3000);
    }
    linkHome = () =>{
        this.props.history.push('/Auth/Details' );
        clearInterval(this.timer);
    }
    render() {
        return (
            <div className="AppScreen StartBackground">
                <div className="Content" >
                    <div className="StartLogo">
                        <img alt="Logo" src={mistcombologo}/>
                        <div className="SubText">
                            Team app
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Start;