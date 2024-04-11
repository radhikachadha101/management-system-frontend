import { combineReducers } from 'redux';
import AppReducer from './appReducer';
import UserReducer from './userReducer';
import ProjectReducer from './projectReducer';
import TaskReducer from './taskReducer';
import RoleReducer from './roleReducer';
import BiddingReducer from './biddingReducer';

import { reducer as form } from 'redux-form';

export default combineReducers({
    AppReducer,
    UserReducer,
    ProjectReducer,
    TaskReducer,
    RoleReducer,
    BiddingReducer,
    form
});