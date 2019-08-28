import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import Button from "@material-ui/core/Button/Button";
import {Line} from 'rc-progress';

const title = {
    'NEW': "Your next job",
    'ACCEPTED': "Current job",
    'IN_PROGRESS': "Job in progress",
    'DONE': "Satus"
};

const btTitle = {
    'NEW': "Accept job now",
    'ACCEPTED': "Start job now",
    'IN_PROGRESS': "Show job details",
    'DONE': "Mark as Done"
};

class CustomeDiaolge extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let detailText = (this.props.transable === true) ? (this.props.progress) ? "Ready to start car wash." : "Customer waits for confirmation"
            : "Finish current job first to start this job next.";
        return (
            <div className="AppScreen Confirmation">
                <div className="Content">
                    <div className="Card">
                        <div className="Title">
                            <div className="Context">
                                <label
                                    style={(this.props.transable != null) ? {display: 'none'} : {display: 'block'}}>{title[this.props.state]}</label>
                                <div className="detailConext"
                                     style={(this.props.transable != null) ? {display: 'block'} : {display: 'none'}}>
                                    <label>Status</label>
                                    <p>{detailText}</p>
                                </div>
                            </div>
                            <div className="Details"
                                 style={(this.props.progress || (this.props.transable != null)) ? {display: 'none'} : {display: 'block'}}>
                                <p>{this.props.item.title}</p><br/>
                                <label>{this.props.item.detail}</label>
                            </div>
                            <div className="ProgressBar"
                                 style={(!this.props.progress) ? {display: 'none'} : {display: 'block'}}>
                                <Line percent={this.props.progressvalue} strokeWidth="2" strokeColor="black"/>
                                <label>{Math.ceil(this.props.starmin)}min done</label>
                                <label>{Math.ceil(this.props.item.last)}min left</label>
                            </div>

                        </div>
                        <div className="Confirm">
                            <Button fullWidth
                                    className="Button AuthBt"
                                    variant="contained"
                                    color="primary"
                                    onClick={this.props.handleState}
                                    disabled={(this.props.transable != null) ? !this.props.transable : false}
                            >
                                {(this.props.transable != null) ? !this.props.transable ? btTitle["ACCEPTED"] : btTitle[this.props.state]
                                    : btTitle[this.props.state]}
                            </Button>
                        </div>
                        <div className="ClientReq"
                             style={(this.props.progress) ? {display: 'none'} : {display: 'block'}}>
                            <label>Customer back in <b>{this.props.item.last}min</b></label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CustomeDiaolge.propTypes = {
    state: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    handleState: PropTypes.func.isRequired,
    progress: PropTypes.bool,
    starmin: PropTypes.number.isRequired,
    progressvalue: PropTypes.number.isRequired,
    endmin: PropTypes.number.isRequired,
    transable: PropTypes.bool
};

export default CustomeDiaolge;