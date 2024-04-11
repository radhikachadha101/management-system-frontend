import {
    GET_SKILLS, GET_BID_STATUS, GET_CHANNELS, CREATE_PROPOSAL, GET_PROPOSALS, GET_PROPOSAL_TYPE,
    DELETE_PROPOSAL, GET_PROPOSAL_BY_ID, UPDATE_PROPOSAL, DELETE_PROPOSAL_DOCUMENT, GET_BID_STATS,
    GET_COUNTRIES, CHANGE_STATUS, GET_PROFILES, GET_CLIENTS, PROFILE_CREATED, UPDATE_PROFILE, GET_PROFILE_BY_ID,
    ADD_SKILLS,GET_STATUS,UPDATE_SKILL,GET_SKILL_BY_ID,BID_STATUS,CREATE_STATUS,UPDATE_STATUS, GET_STATUS_BY_ID,
    ADD_COMMENT,ADD_CLIENT,GET_CLIENT_BY_ID,UPDATE_CLIENT
} from '../config/actionNames';
const initialState = {
    skills: [],
    channels: [],
    bidStatus: [],
    proposalType: [],
    proposalDetail: [],
    status:[],
    proposalAdded: false,
    poposalDeleted: false,
    proposalUpdate: false,
    profiles: [],
    countries: [],
    clients: [],
    profileAdded: false,
    profile: [],
    profileUpdated: [],
    profileUpdateCheck: false,
    skilled:[],
    Skill:[],
    status:[],
    skillSubmit: false,
    statusAdded:false,
    statusUpdateCheck:false,
    StatusId:[],
    userProposalsData:[],
    proposals:[],
    client:[],
    clientAdded:false,
    clientsUpdateCheck:false,
    clientId:[]


};
function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_SKILLS:
            return {
                ...state,
                skills: action.payload,
                profileUpdateCheck: false,
                skillSubmit: false,
            }
        case GET_CHANNELS:
            return {
                ...state,
                channels: action.payload,
            }
        case GET_PROPOSAL_TYPE:
            return {
                ...state,
                proposalType: action.payload,
            }
        case GET_BID_STATUS:
            return {
                ...state,
                bidStatus: action.payload,
            }
        case CREATE_PROPOSAL: return {
            ...state,
            proposal: action.payload,
            // userActionPerformed: true,
            proposalAdded: true,
            proposalUpdate: false

        }
        case GET_PROPOSALS:
            return {
                ...state,
                proposals: action.payload,
                // userActionPerformed: true,
                proposalAdded: false,
                proposalUpdate: false,
            }
            case GET_STATUS:
            return {
                ...state,
                proposals: action.payload,
                // userActionPerformed: true,
                // proposalAdded: false,
                // proposalUpdate: false,
            }
        case GET_PROPOSAL_BY_ID:
            return {
                ...state,
                proposalDetail: action.payload,
                // userActionPerformed: true,
                poposalDeleted: false,
                commentAdd: false
            }
        case UPDATE_PROPOSAL:
            return {
                ...state,
                proposalUpdated: action.payload,
                // userActionPerformed: true,
                proposalUpdate: true,
                proposalAdded: false,
            }
        case DELETE_PROPOSAL:
            return {
                ...state,
                deletedProposal: action.payload,
                poposalDeleted: true
            }
        case DELETE_PROPOSAL_DOCUMENT:
            return {
                ...state,
                deletedProposalDocument: action.payload,
                poposalDeleted: true
            }
        case GET_BID_STATS:
            return {
                ...state,
                userProposalsData: action.payload,
            }
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
            }
        case CHANGE_STATUS:
            return {
                ...state,
                proposal: action.payload,
                proposalUpdate: true
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                profileUpdateCheck: false,
                profileAdded: false,
            }
        case GET_CLIENTS:
            return {
                ...state,
                clients: action.payload,
                clientAdded: false,
                clientsUpdateCheck: false
            }
        case PROFILE_CREATED:
            return {
                ...state,
                clients: action.payload,
                profileAdded: true,
                profileUpdateCheck: false
            }
        case GET_PROFILE_BY_ID:
            return {
                ...state,
                profile: action.payload,
            }
        case UPDATE_PROFILE:
            return {
                ...state,
                profileUpdated: action.payload,
                profileUpdateCheck: true,
                profileAdded: false,

            }
        case ADD_SKILLS:
            return {
                ...state,
                skilled: action.payload,
                skillSubmit: true,
                SkillUpdateCheck: false,

            }
            case GET_SKILL_BY_ID:
            return {
                ...state,
                Skill: action.payload,
                SkillUpdateCheck: false
            }
            case UPDATE_SKILL:
            return {
                ...state,
                SkillUpdated: action.payload,
                SkillUpdateCheck: true,
                skillSubmit: false,

            }
            case BID_STATUS:
            return {
                ...state,
                status: action.payload,
                statusAdded: false,
                statusUpdateCheck: false

            }
            case CREATE_STATUS:
            return {
                ...state,
                status: action.payload,
                statusAdded: true,
                statusUpdateCheck: false
            }
            case UPDATE_STATUS:
            return {
                ...state,
                status: action.payload,
                statusAdded: false,
                statusUpdateCheck: true
             }
             case GET_STATUS_BY_ID:
            return {
                ...state,
                StatusId: action.payload,
                statusUpdateCheck: false
            }
            case ADD_COMMENT:
                return {
                    ...state,
                    comment: action.payload,
                    commentAdd: true
                }
            case ADD_CLIENT:
                return {
                   ...state,
                    clients: action.payload,
                    clientAdded: true,
                    clientsUpdateCheck:false
                    }
            case GET_CLIENT_BY_ID:
                return {
                   ...state,
                    clientId: action.payload,
                        }
            case UPDATE_CLIENT:
                return {
                   ...state,
                   clients: action.payload,
                   clientAdded: false,
                   clientsUpdateCheck: true
                       }
                      

        default:
            return state;
    }
};
export default reducer;