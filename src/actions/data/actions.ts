import {action} from "typesafe-actions";
import {DATA_PUSH} from "./constants";

export const pushData = (data: IData[]) => action(DATA_PUSH, data);

