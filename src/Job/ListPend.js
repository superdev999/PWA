import React, {Component} from 'react';

import './ListPend.scss'

import timerIcon from '../general/CustomListView/images/timerIcon.png'
import checkIcon from '../general/CustomListView/images/checkIcon.png'
import circleIcon from '../general/CustomListView/images/ic-acceptedupcoming.png'
import CustomeDiaolge from "../general/CustomDialoge";
import CheckboxListSecondary from "../general/CustomListView"
import NavBar from "../general/NavBar";
import 'react-html5-camera-photo/build/css/index.css';
import connect from "react-redux/es/connect/connect";
import {withTheme} from "@material-ui/core";

import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css';

import {
    getTeamInfo,
    getOrderForTeam,
    setOrderState,
    setRestTime,
    setDetailContent
} from "../api/teamMngAction";

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
    }
};

const mapDispatchToProps = {
    getTeamInfo,
    getOrderForTeam,
    setOrderState,
    setRestTime,
    setDetailContent
};

class ListPend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            starmin: 0,
            endmin: 100,
            pendShow: true,
            acceptShow: false,
        };
        this.timer = setInterval(this.SetLastTime, 60000);
        this.onHandleState = this.onHandleState.bind(this)
    }

    componentDidMount() {
        this.props.getTeamInfo(this.props.token);
        this.props.getOrderForTeam(this.props.token, this.props.teamDescription);
        if (this.props.NowConduct[0]) {
            if (this.props.NowConduct[0].state === "ACCEPTED") {
                this.setState({
                    acceptShow: true,
                    pendShow: true,
                    endmin: this.props.NowConduct[0].last
                })
            } else if (this.props.NowConduct[0].state === "IN_PROGRESS") {
                this.setState({
                    acceptShow: true,
                    pendShow: false,
                    endmin: this.props.NowConduct[0].last
                })
            } else {
                this.setState({
                    acceptShow: false,
                    pendShow: true,
                    endmin: this.props.NowConduct[0].last
                })
            }
        }
    }

    SetLastTime = () => {
        if (this.state.progress > 100) {
            clearInterval(this.timer);
        }
        if (this.props.NowConduct[0] != null) {
            this.props.setRestTime();
            if (this.props.NowConduct[0].state === "IN_PROGRESS") {
                this.setState({
                    progress: (this.state.endmin !== 0) ? this.state.progress + (100 / this.state.endmin) : this.state.progress,
                    starmin: this.state.starmin + 1,
                });
            }
        }
    };

    showDetails = (data) => {
        clearInterval(this.timer);
        if (this.props.setDetailContent(data)) this.props.history.push("/Job/Details");
    }

    onHandleState = () => {
        let nofitication = "";
        let orderId = this.props.NowConduct[0].id;
        let curState = this.props.NowConduct[0].state;
        switch (curState) {
            case "NEW": {
                this.setState({
                    acceptShow: true,
                    pendShow: true
                })
                this.props.setOrderState(this.props.token, orderId, "ACCEPTED", this.props.teamDescription);
                nofitication = "This order is accepted.";
                break;
            }
            case "ACCEPTED": {
                this.setState({
                    acceptShow: true,
                    pendShow: false
                });
                this.props.setOrderState(this.props.token, orderId, "IN_PROGRESS", this.props.teamDescription);
                nofitication = "This order is in progress.";
                break;
            }
            case "IN_PROGRESS": {
                clearInterval(this.timer);
                this.showDetails(this.props.NowConduct[0]);
                break;
            }
            default:
                break;
        }
        //if (curState !== "IN_PROGRESS") toast.notify(nofitication);
    };

    render() {
        const {NewOrderList, FinishedOrderList, AcceptOrderList, NowConduct} = this.props;
        return (
            <div className="AppScreen ListPend">
                <NavBar title="Mistwash Team App">
                </NavBar>
                <div className="SubScribe">
                    <label>{this.props.teamDescription}</label>
                    <label>{this.props.teamName}</label>
                </div>
                <div className="Content">
                    {
                        (NowConduct[0] != null) ?
                            <CustomeDiaolge item={NowConduct[0]} state={NowConduct[0].state}
                                            progress={(NowConduct[0].state === "IN_PROGRESS")}
                                            handleState={this.onHandleState.bind(this)}
                                            starmin={this.state.starmin}
                                            progressvalue={this.state.progress}
                                            endmin={this.state.endmin}/> :
                            <div className="SubScribe">
                                <label style={{
                                    width: "100%",
                                    height: "100%",
                                    textAlign: "center",
                                    margin: "0",
                                    float: "right"
                                }}>"No Jobs unavailable"</label>
                            </div>
                    }

                    <div className="PendingList"
                         style={(!this.state.pendShow) ? {display: 'none'} : {display: 'block'}}>
                        <p>Pendding Acceptance</p>
                        {
                            (NowConduct[0] != null && NewOrderList[0] != null) ?
                                <CheckboxListSecondary frontIcon={timerIcon}
                                                       item={NewOrderList}
                                                       showDetails={this.showDetails.bind(this)}/> :
                                <div className="SubScribe">
                                    <label style={{
                                        width: "100%",
                                        textAlign: "center",
                                        float: "right"
                                    }}>"No Jobs unavailable"</label>
                                </div>
                        }

                    </div>
                    <div className="PendingList">
                        <p>{(!this.state.acceptShow) ? `Finished Jobs` : `Aceepted Upcoming Job`}</p>
                        {
                            (!this.state.acceptShow) ?
                                (FinishedOrderList[0] != null) &&
                                <CheckboxListSecondary frontIcon={checkIcon} item={FinishedOrderList}
                                                       showDetails={this.showDetails.bind(this)}/>
                                : (AcceptOrderList[0] != null) &&
                                <CheckboxListSecondary frontIcon={circleIcon} item={AcceptOrderList}
                                                       showDetails={this.showDetails.bind(this)}/>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTheme()(ListPend));