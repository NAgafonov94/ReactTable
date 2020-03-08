interface ITableColumn {
    id: string;
    label: string;
}

interface ITableRow {
    [key: string]: any;
}

interface IData {
    updateData: string;
    message: string;
}

declare module 'MyTypes' {
    import {ActionType, StateType} from "typesafe-actions";

    export type RootAction = ActionType<typeof import('./store').actions>;
    export type RootState = StateType<ReturnType<typeof import('./store').reducers>>;
}
