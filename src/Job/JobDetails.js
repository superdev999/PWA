import React, {Component} from 'react';

import './JobDetails.scss'

import CustomeDiaolge from "../general/CustomDialoge";
import Popup from "../general/CustomPopUp";
import NavBar from "../general/NavBar";
import carPic from "./images/car.png"


import connect from "react-redux/es/connect/connect";
import {withTheme} from "@material-ui/core";

import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css';

import {
    getTeamInfo,
    getOrderForTeam,
    setOrderState,
    setRestTime,
} from "../api/teamMngAction";


let backTo = '/Job/ListPend';


const mapStateToProps = (state) => {
    return {
        token: state.session.token,
        teamName: state.teamManage.teamName,
        teamDescription: state.teamManage.teamDescription,
        NewOrderList: state.teamManage.NewOrderList,
        AcceptOrderList: state.teamManage.AcceptOrderList,
        FinishedOrderList: state.teamManage.FinishedOrderList,
        OrderState: state.teamManage.OrderState,
        NowConduct: state.teamManage.NowConduct,
        DtailContent: state.teamManage.DtailContent,
    }
};

const mapDispatchToProps = {
    getTeamInfo,
    getOrderForTeam,
    setOrderState,
    setRestTime,
};


class JobDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progressState: "NEW",
            showPopup: false,
            progress: 0,
            starmin: 0,
            endmin: 100,
            transAvailable: false
        };
    }

    componentDidMount() {
        this.timer = setInterval(this.SetLastTime, 60000);
        if (this.props.DtailContent && this.props.NowConduct[0]) {
            if (this.props.DtailContent.id === this.props.NowConduct[0].id) {
                this.setState({
                    transAvailable: true
                })
            } else {
                this.setState({
                    transAvailable: false
                })
            }

            if (this.props.DtailContent.state === "NEW") {
                this.setState({
                    progressState: "NEW",
                    endmin: this.props.DtailContent.last
                })
            } else if (this.props.DtailContent.state === "ACCEPTED") {
                this.setState({
                    progressState: "ACCEPTED",
                    endmin: this.props.DtailContent.last
                })
            } else {
                this.setState({
                    progressState: "DONE",
                    endmin: this.props.DtailContent.last
                })
            }
        }
    }

    SetLastTime = () => {
        if (this.state.progress > 100) {
            clearInterval(this.timer);
        }
        if (this.props.DtailContent) {
            if (this.state.progressState === "DONE") {
                this.setState({
                    progress: (this.state.endmin !== 0) ? this.state.progress + (100 / this.state.endmin) : this.props.progress,
                    endmin: (this.props.DtailContent != null) ? this.props.DtailContent.last : 100,
                    starmin: this.state.starmin + 1,
                });
            }
            this.props.setRestTime();
        }
    };

    onHandleState = () => {
        let orderId = this.props.NowConduct[0].id;
        let curState = this.props.NowConduct[0].state;
        switch (curState) {
            case "NEW": {
                this.setState({
                    progressState: 'ACCEPTED'
                });
                // toast.notify("This order is accepted.");

                this.props.setOrderState(this.props.token, orderId, "ACCEPTED", this.props.teamDescription);
                break;
            }
            case "ACCEPTED": {
                this.setState({
                    progressState: 'DONE'
                })
                this.props.setOrderState(this.props.token, orderId, "IN_PROGRESS", this.props.teamDescription);
                //toast.notify("This order is progress.");
                break;
            }
            case "IN_PROGRESS": {
                clearInterval(this.timer);
                this.setState({
                    showPopup: !this.state.showPopup
                });
                break;
            }
            default:
                break;
        }
    };


    togglePopup = (state) => {
        this.setState({
            showPopup: !this.state.showPopup
        });
        if (state === 1) {
            toast.notify("This order is canceled. Is this not finished?");
            this.props.setOrderState(this.props.token, this.props.DtailContent.id, 'CANCEL', this.props.teamDescription);
        }
    };
    confirmDone = () => {
        this.timerDelay = setInterval(this.returnBack, 3000);
        this.props.setOrderState(this.props.token, this.props.DtailContent.id, 'DONE', this.props.teamDescription)
        clearInterval(this.timer);
    };

    returnBack = () => {
        if (this.props.NowConduct[0]) {
            if (this.props.NowConduct[0].state === "NEW") {
                toast.notify("This order is done.");
                this.props.history.push('/Job/ListPend');
                clearInterval(this.timerDelay);
            }
        }
    }

    render() {
        const {DtailContent} = this.props;
        return (
            <div className="AppScreen FinishConfirm">
                <NavBar title="Mistwash Team App" backTo={backTo}/>
                <div className="Content">
                    <CustomeDiaolge item={DtailContent} state={this.state.progressState}
                                    progress={(this.state.progressState === "DONE")}
                                    handleState={this.onHandleState.bind(this)}
                                    starmin={this.state.starmin}
                                    progressvalue={this.state.progress}
                                    endmin={this.state.endmin}
                                    transable={this.state.transAvailable}/>
                    <div className="SubText">
                        <p>License plate number</p>
                        <label>{DtailContent.title}</label>
                    </div>
                    <div className="SubText">
                        <p>Car location</p>
                        <label>{DtailContent.detail}</label>
                    </div>
                    <div className="DetailPic">
                        <p>Car picture</p>
                        <img className="carImg" src={carPic} alt="carImg"/>
                    </div>
                </div>
                {this.state.showPopup ?
                    <Popup
                        text='Close Me'
                        closePopup={this.togglePopup.bind(this)}
                        confirmDone={this.confirmDone.bind(this)}
                    />
                    : null
                }
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTheme()(JobDetails));