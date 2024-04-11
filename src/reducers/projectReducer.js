import {
    CREATE_PROJECT, GET_PROJECTS, GET_PROJECT, UPDATE_PROJECT,REDIRECT_URI
} from '../config/actionNames';
const initialState = {
    project: {},
    projects: [],
    projectAdded: false,
    projectUpdated: false,

};
function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROJECT:
            return {
                ...state,
                project: action.payload,
            }
        case UPDATE_PROJECT:
            return {
                ...state,
                project: action.payload,
                projectUpdated:true
            }
        case CREATE_PROJECT:
            return {
                ...state,
                project: action.payload,
                projectAdded: true,
            }
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload,
            }
        case REDIRECT_URI: 
            return {
                ...state,
                projectUpdated:false,
                projectAdded: false,

            }
        default:
            return state;
    }
};
export default reducer;