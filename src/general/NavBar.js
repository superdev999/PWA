import React, {Component} from 'react';
import {Link} from "react-router-dom";
import phoneIcon from "./images/icon_call.png"
import './NavBar.scss';

const svgBackIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" style={{fill: 'white'}}>
    <path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z"/>
</svg>

class NavBar extends Component {
    render() {
        const numberOfSteps = 3;
        const {title, backTo, step} = this.props;

        const stepCss = new Array(3).fill(
            "Step"
        );

        for (let i = 1; i <= numberOfSteps; i++) {
            if (i <= step) {
                stepCss[i - 1] += " activeStep";
            }
        }

        return (
            <div className="NavBarContainer">
                <div className="NavBar">
                    <div className="NavBarUpperRow">
                        {(backTo) &&
                        <div className="NavBackLink">
                            <Link to={backTo}>
                                {svgBackIcon}
                            </Link>
                        </div>
                        }
                        <div className="NavTitle">
                            {title}
                        </div>
                        <div className="NavFixedSpaceRight">
                            <img src={phoneIcon} fill="white" alt="phoneIcon"></img>
                        </div>
                    </div>
                    {(step > 0) &&
                    <div className="NavSteps">
                        {stepCss.map((styleName, index) =>
                            <div key={index.toString()} className={styleName}/>
                        )}
                    </div>
                    }
                </div>
            </div>
        );
    }
}

export default NavBar;