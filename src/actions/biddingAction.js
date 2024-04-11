import axios from 'axios';
import { GET_SKILLS ,USER_ACTION_PERFORMED,GET_BID_STATUS,GET_CHANNELS,CREATE_PROPOSAL,UPDATE_PROPOSAL,CHANGE_STATUS,GET_CLIENTS,  
    DELETE_PROPOSAL,GET_PROPOSALS,GET_PROPOSAL_TYPE,GET_PROPOSAL_BY_ID,ADD_SKILLS,UPDATE_PROFILE,GET_PROFILE_BY_ID,DELETE_PROPOSAL_DOCUMENT,
    PROFILE_CREATED, GET_PROFILES,GET_BID_STATS,GET_COUNTRIES,GET_STATUS,UPDATE_SKILL,GET_SKILL_BY_ID,BID_STATUS,CREATE_STATUS,UPDATE_STATUS,
    GET_STATUS_BY_ID,ADD_COMMENT,ADD_CLIENT,GET_CLIENT_BY_ID,UPDATE_CLIENT
} from '../config/actionNames';
import { api } from '../config/env';
import { toast } from 'react-toastify';
const PATH = `${api}api/bidding`;
function userActionPerformed(dispatch) {
	setTimeout(() => {
		dispatch({ type: USER_ACTION_PERFORMED });
	}, 500)
}
export function getSkills() {
    return dispatch => {
        axios
            .get(`${PATH}/skills`)
            .then(response => {
                dispatch({ type: GET_SKILLS, payload: response.data });
            })
            .catch(err => {
            });
    };
}
export function getSkillsData(offset, limit, SEARCH) {
    return dispatch => {
        axios
            .get(`${PATH}/skills`,{
                params: {
					...SEARCH,
					offset,
					limit,
                }
            })
            .then(response => {
                dispatch({ type: GET_SKILLS, payload: response.data });
            })
            .catch(err => {
            });
    };
}
export function getProfileById(id) {
    return dispatch => {
        axios
            .get(`${PATH}/profile/${id}`)
            .then(response => {
                dispatch({ type: GET_PROFILE_BY_ID, payload: response.data });
            })
            .catch(err => {
            });
    };
}

export function getBidStatus() {
    return dispatch => {
        axios
            .get(`${PATH}/status`)
            .then(response => {
                dispatch({ type: GET_BID_STATUS, payload: response.data });
            })
            .catch(err => {
            });
    };
}

export function getCountries() {
    return dispatch => {
        axios
            .get(`${PATH}/countries`)
            .then(response => {
                dispatch({ type: GET_COUNTRIES, payload: response.data });
            })
            .catch(err => {
            });
    };
}



export function getChannels() {
    return dispatch => {
        axios
            .get(`${PATH}/channels`)
            .then(response => {
                dispatch({ type: GET_CHANNELS, payload: response.data });
            })
            .catch(err => {
            });
    };
}
export function getProposalType() {
    return dispatch => {
        axios
            .get(`${PATH}/proposalType`)
            .then(response => {
                dispatch({ type: GET_PROPOSAL_TYPE, payload: response.data });
            })
            .catch(err => {
            });
    };
}


export function addProposal(payload) {
	return dispatch => {
		axios
			.post(`${PATH}`, payload)
			.then(response => {
				if(response.data.error){
					toast.error(response.data.message);
				}else{
				toast.success('Proposal created Successfully');
				dispatch({ type: CREATE_PROPOSAL, payload: response.data });
				}
			})
			.catch(err => {
				toast.error('Unable to create Proposal');
			});
	};
}
export function createProfile(payload) {
	return dispatch => {
		axios
			.post(`${PATH}/profile/create`, payload)
			.then(response => {
				if(response.data.error){
					toast.error(response.data.message);
				}else{
				toast.success('Profile created  Successfully');
				dispatch({ type: PROFILE_CREATED, payload: response.data });
				}
			})
			.catch(err => {
				toast.error('Unable to create Proposal');
			});
	};
}
export function changeStatus(payload) {
	return dispatch => {
		axios
			.post(`${PATH}/changeStatus`, payload)
			.then(response => {
				if(response.data.error){
					toast.error(response.data.message);
				}else{
				toast.success('Proposal Status Changes Successfully');
				dispatch({ type: CHANGE_STATUS, payload: response.data });
				}
			})
			.catch(err => {
				toast.error('Unable to create Proposal');
			});
	};
}

export function bidProfiles() {
    return dispatch => {
        axios
            .get(`${PATH}/bidProfile`)
            .then(response => {
                dispatch({ type: GET_PROFILES, payload: response.data });
            })
            .catch(err => {
            });
    };
}

export function getBidProfiles(offset, limit, SEARCH) {
    return dispatch => {
        axios
            .get(`${PATH}/bidProfile`,{
                params: {
					...SEARCH,
					offset,
					limit,
                }
            })
            .then(response => {
                dispatch({ type: GET_PROFILES, payload: response.data });
            })
            .catch(err => {
            });
    };
}
export function getclients(offset, limit, SEARCH) {
    return dispatch => {
        axios
            .get(`${PATH}/clients` ,{
                params: {
					...SEARCH,
					offset,
					limit,
                }
            })
            .then(response => {
                dispatch({ type: GET_CLIENTS, payload: response.data });
            })
            .catch(err => {
            });
    };
}

export function updateProposal (id,payload){

    return dispatch => {
		axios
            .put(`${PATH}/${id}`, payload)
			.then(response => {
				if(response.data.error){
					toast.error(response.data.message);
				}else{
				toast.success('Proposal updated Successfully');
                dispatch({ type: UPDATE_PROPOSAL, payload: response.data });
				}
			})
			.catch(err => {
				toast.error('Unable to update Proposal');
			});
	};

}

export function editProfile (id,payload){

    return dispatch => {
		axios
            .put(`${PATH}/profile/update/${id}`, payload)
			.then(response => {
				if(response.data.error){
					toast.error(response.data.message);
				}else{
				toast.success('Profile updated Successfully');
                dispatch({ type: UPDATE_PROFILE, payload: response.data });
				}
			})
			.catch(err => {
				toast.error('Unable to update Profile');
			});
	};

}




export function getProposals(offset, limit, SEARCH) {
    return dispatch => {
        axios
            .get(`${PATH}`,{
                params: {
					...SEARCH,
					offset,
					limit,
                }
            })
            .then(response => {
                dispatch({ type: GET_PROPOSALS, payload: response.data });
            })
            .catch(err => {
            });
    };
}

export function getPrpoposalById(id) {
    return dispatch => {
        axios
            .get(`${PATH}/${id}`)
            .then(response => {
                dispatch({ type: GET_PROPOSAL_BY_ID, payload: response.data });
            })
            .catch(err => {
            });
    };
}

export function deleteProposalDocument(id) {
	return (dispatch) => {
		axios
			.delete(`${PATH}/documemnt/${id}`)
			.then((response) => {
				dispatch({ type: DELETE_PROPOSAL_DOCUMENT, payload: response.data });
				toast.success('Proposal document deleted Successfully');
			})
			.catch((err) => { });
	};
}




export function graphProposal(value,value1) {
    
    return dispatch => {
        axios
        .get(`${PATH}/stats?startDate=${value}&endDate=${value1}`,{
            params: {
                ...value,
                ...value1
            }
        })
            .then(response => {
                dispatch({ type: GET_BID_STATS, payload: response.data });
            })
            .catch(err => {
            });
    };
}

export function statusProposal(value,value1) {
    
    return dispatch => {
        axios
        .get(`${PATH}/proposalstatus?startDate=${value}&endDate=${value1}`,{
            params: {
                ...value,
                ...value1
            }
        })
            .then(response => {
                dispatch({ type: GET_STATUS, payload: response.data });
            })
            .catch(err => {
            });
    };
}
export function addskills(payload) {
    
	return dispatch => {
        
		axios
			.post(`${PATH}/skills`, payload)
			.then(response => {
				if(response.data.error){
					toast.error(response.data.message);
				}else{
				toast.success('Skill created Successfully');
				dispatch({ type: ADD_SKILLS, payload: response.data });
				}
			})
			.catch(err => {
				toast.error('Unable to create Skill');
			});
	};

}

export function editSkill (id,payload){

    return dispatch => {
		axios
            .put(`${PATH}/skills/update/${id}`, payload)
			.then(response => {
				if(response.data.error){
					toast.error(response.data.message);
				}else{
				toast.success('skill updated Successfully');
                dispatch({ type: UPDATE_SKILL, payload: response.data });
				}
			})
			.catch(err => {
				toast.error('Unable to update skill');
			});
	};

}

export function getSkillById(id) {
    return dispatch => {
        axios
            .get(`${PATH}/skills/${id}`)
            .then(response => {
                dispatch({ type: GET_SKILL_BY_ID, payload: response.data });
            })
            .catch(err => {
            });
    };
}

export function bidstatus(offset, limit, SEARCH) {
    return dispatch => {
        axios
            .get(`${PATH}/bidstatus`,{
                params: {
					...SEARCH,
					offset,
					limit,
                }
            })
            .then(response => {
                dispatch({ type: BID_STATUS, payload: response.data });
            })
            .catch(err => {
            });
    };
}

export function addstatus(payload) {
    
	return dispatch => {
        
		axios
			.post(`${PATH}/bidstatus/create`, payload)
			.then(response => {
				if(response.data.error){
					toast.error(response.data.message);
				}else{
				toast.success('Status created Successfully');
				dispatch({ type: CREATE_STATUS, payload: response.data });
				}
			})
			.catch(err => {
				toast.error('Unable to create status');
			});
	};

}

export function editStatus (id,payload){

    return dispatch => {
		axios
            .put(`${PATH}/bidstatus/update/${id}`, payload)
			.then(response => {
				if(response.data.error){
					toast.error(response.data.message);
				}else{
				toast.success('Status updated Successfully');
                dispatch({ type: UPDATE_STATUS, payload: response.data });
				}
			})
			.catch(err => {
				toast.error('Unable to update Status');
			});
	};

}

export function getStatusById(id) {
    return dispatch => {
        axios
            .get(`${PATH}/bidstatus/${id}`)
            .then(response => {
                dispatch({ type: GET_STATUS_BY_ID, payload: response.data });
            })
            .catch(err => {
            });
    };
}


export function addComment(payload) {
	return dispatch => {
		axios
			.post(`${PATH}/addComment`, payload)
			.then(response => {
				if(response.data.error){
					toast.error(response.data.message);
				}else{
				toast.success('Comment added Successfully');
				dispatch({ type: ADD_COMMENT, payload: response.data });
				}
			})
			.catch(err => {
				toast.error('Unable to add comment');
			});
	};
}

export function addClient(payload) {
	return dispatch => {
		axios
			.post(`${PATH}/addClient`, payload)
			.then(response => {
				if(response.data.error){
					toast.error(response.data.message);
				}else{
				toast.success('New client added Successfully');
				dispatch({ type: ADD_CLIENT, payload: response.data });
				}
			})
			.catch(err => {
				toast.error('Unable to create client');
			});
	};
}

export function getClientById(id) {
    return dispatch => {
        axios
            .get(`${PATH}/client/${id}`)
            .then(response => {
                dispatch({ type: GET_CLIENT_BY_ID, payload: response.data });
            })
            .catch(err => {
            });
    };
}

export function updateClient (id,payload){

    return dispatch => {
		axios
            .put(`${PATH}/client/update/${id}`, payload)
			.then(response => {
				if(response.data.error){
					toast.error(response.data.message);
				}else{
				toast.success('client updated Successfully');
                dispatch({ type: UPDATE_CLIENT, payload: response.data });
				}
			})
			.catch(err => {
				toast.error('Unable to update client');
			});
	};

}