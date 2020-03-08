import {Dispatch} from "redux";
import {RootAction} from "MyTypes";
import {pushData} from "./actions";

export const loadDataThunk = () => async (dispatch: Dispatch<RootAction>): Promise<void> => {
    fetch('data/data.json')
        .then((response: Response) => response.json())
        .then((data: IData[]) => dispatch(pushData(data)));
};
