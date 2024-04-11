import React from 'react';
import { connect } from 'react-redux';
import * as AppActions from '../../actions/appActions';
import * as UserActions from '../../actions/userActions';
import * as ProjectActions from '../../actions/projectActions';
import * as TaskActions from '../../actions/taskActions';
import * as RoleActions from '../../actions/roleActions';
import * as CommentActions from '../../actions/commentActions';
import * as BiddingActions from '../../actions/biddingAction';

import { useLocation  } from 'react-router-dom';
function mapStateToProps(state) {
	const { AppReducer, UserReducer, ProjectReducer, TaskReducer, RoleReducer,BiddingReducer } = state;
	return {
        ...AppReducer, ...UserReducer, ...ProjectReducer, ...TaskReducer, ...RoleReducer,...BiddingReducer
	}
}

const getConnect = Component => {
    const MyComponent = props => {
        const location = useLocation();
        return <Component {...props} location={location} />;
    };
    return connect(mapStateToProps, {
        ...AppActions, ...UserActions, ...ProjectActions, ...TaskActions, ...RoleActions,...CommentActions,...BiddingActions
    })(MyComponent);
}

export default getConnect;
