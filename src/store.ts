import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, {ThunkMiddleware} from 'redux-thunk';
import dataReducer from "./actions/data/reducer";
import * as dataActions from './actions/data/actions';
import {RootAction, RootState} from "MyTypes";

export const reducers = combineReducers({
    dataReducer
});

export const actions = {
    dataActions
};

export default createStore(reducers, applyMiddleware(thunk as ThunkMiddleware<RootState, RootAction>));
