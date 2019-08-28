import {createReducer} from "redux-starter-kit";
import {teamMngType} from "./ApiTypes";

import {
    TEAMINFO_GET_SUCCESSFUL,
    TEAMINFO_GET_ERROR,
    TEAMORDERS_GET_SUCCESSFUL,
    SET_ORDERSTATUS_ERROR,
    SET_RESTTIMR,
    RESET_NOWCONDUCT,
    SET_NOWCONDUCT_ORDER,
    SET_DETAILCONTENT
} from "./teamMngAction";

const convDate2time = (date) => {
    let length = date.length;
    let number = [];
    let j = 0;
    for (let i = 0; i < length; i++) {
        if (date[i] === '-' || date[i] === 'T' || date[i] === ':' || date[i] === '.' || date[i] === 'Z')
            continue;
        else {
            number[j] = date[i] - '\n';
            j++;
        }
    }
    let time = (number[6] * 10 + number[7]) * 24 * 60 + (number[8] * 10 + number[9]) * 60 + (number[10] * 10 + number[11]);

    return time;
};
export default createReducer(
    {...teamMngType},
    {
        [TEAMINFO_GET_SUCCESSFUL]: (state, action) =>
            ({
                ...state,
                teamName: action.payload.name,
                teamDescription: action.payload.metaData.type,
                OrderState: true
            }),
        [TEAMORDERS_GET_SUCCESSFUL]: (state, action) => {
            if (action.payload) {
                let size = action.payload.listHeader.listSize;
                let tempDate = new Date();
                let curtime = tempDate.getDate() * 24 * 60 + tempDate.getHours() * 60 + tempDate.getMinutes();
                state.NewOrderList = [];
                state.AcceptOrderList = [];
                state.FinishedOrderList = [];
                if (state.NowConduct[0]) {
                    if (state.NowConduct[0].state === "DONE") {
                        state.NowConduct = [];
                    }
                }
                for (let i = 0; i < size; i++) {
                    switch (action.payload.list[i].orderStatus) {
                        case "NEW": {
                            let datetime = convDate2time(action.payload.list[i].orderData.parkTime.endDateTime);
                            state.NewOrderList.push({
                                key: state.NewOrderList.length + 1,
                                title: action.payload.list[i].orderData.licensePlateNumber,
                                detail: action.payload.list[i].orderData.exactParkLocation,
                                last: datetime - curtime,
                                id: action.payload.list[i].id,
                                state: action.payload.list[i].orderStatus,
                            });
                            break;
                        }
                        case "IN_PROGRESS":
                        case "ACCEPTED": {
                            let datetime = convDate2time(action.payload.list[i].orderData.parkTime.endDateTime);
                            state.AcceptOrderList.push({
                                key: state.AcceptOrderList.length + 1,
                                title: action.payload.list[i].orderData.licensePlateNumber,
                                detail: action.payload.list[i].orderData.exactParkLocation,
                                last: datetime - curtime,
                                id: action.payload.list[i].id,
                                state: action.payload.list[i].orderStatus,
                            });
                            break;
                        }
                        case "DONE": {
                            state.FinishedOrderList.push({
                                key: state.FinishedOrderList.length + 1,
                                title: action.payload.list[i].orderData.licensePlateNumber,
                                detail: action.payload.list[i].orderData.exactParkLocation,
                                last: 'see datails',
                                id: action.payload.list[i].id,
                                state: action.payload.list[i].orderStatus,
                            });
                            break;
                        }
                        default:
                            break;
                    }
                }
                if (state.NowConduct[0] == null)
                    state.NowConduct.push(state.NewOrderList[0]);
            }
        },
        [TEAMINFO_GET_ERROR]: (state) =>
            ({...state}),
        [SET_ORDERSTATUS_ERROR]: (state) =>
            ({...state, OrderState: 'false'}),
        [RESET_NOWCONDUCT]: (state) => {
            return ({...state, NowConduct: []});
        },
        [SET_DETAILCONTENT]: (state, action) => {
            if (state.NowConduct[0].state === "NEW") {
                const items = [...state.NowConduct].map((item) => ({...item}));
                items[0] = action.data;
                return ({...state, DtailContent: action.data, NowConduct: items});
            } else {
                return ({...state, DtailContent: action.data});
            }
        },
        [SET_NOWCONDUCT_ORDER]: (state, action) => {
            const items = [...state.NowConduct].map((item) => ({...item}));
            items[0] = {
                key: items[0].key,
                title: items[0].title,
                detail: items[0].detail,
                last: items[0].last,
                id: items[0].id,
                state: action.orderState,
            };
            return ({...state, NowConduct: items});
        },
        [SET_RESTTIMR]: (state) => {
            const items = [...state.NowConduct].map((item) => ({...item}));
            items[0] = {
                key: items[0].key,
                title: items[0].title,
                detail: items[0].detail,
                last: items[0].last - 1,
                id: items[0].id,
                state: items[0].state
            };
            return ({...state, NowConduct: items});
        }
    }
);