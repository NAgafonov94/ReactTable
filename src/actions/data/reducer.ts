import {DATA_PUSH, DataActions} from "./constants";

const initialState: IData[] = [];

export default (state = initialState, action: DataActions) => {
    switch (action.type) {
        case DATA_PUSH:
            return [...state, ...action.payload];
        default:
            return state;
    }
}
