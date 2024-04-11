import {
    GET_ROLES, USER_ACTION_PERFORMED
} from '../config/actionNames';
const initialState = {
    roles: [],
    userActionPerformed: false,
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ROLES:
            return {
                ...state,
                roles: action.payload,
            }
        case USER_ACTION_PERFORMED:
            return {
                ...state,
                userActionPerformed: false,
            }
        default:
            return state;
    }
};
export default reducer;