export const DATA_PUSH = 'DATA_PUSH';

interface DataPushAction {
    type: typeof DATA_PUSH;
    payload: IData[];
}

export type DataActions = DataPushAction;
