import axios from 'axios';
import { CREATE_USER, GET_USERS, GET_USER, UPDATE_USER, DELETE_USER, USER_ACTION_PERFORMED,URER_REDIRECT_URI,COPY_CREDENTIALS } from '../config/actionNames';
import { api } from '../config/env';
import { toast } from 'react-toastify';
const PATH = `${api}api/users`;
function userActionPerformed(dispatch) {
	setTimeout(() => {
		dispatch({ type: USER_ACTION_PERFORMED });
	}, 500)
}
export function getUsers(offset, limit, SEARCH) {
	return dispatch => {
		axios
			.get(`${PATH}`, {
				params: {
					...SEARCH,
					offset,
					limit,
				}
			})
			.then(response => {
				dispatch({ type: GET_USERS, payload: response.data });
			})
			.catch(err => {
			});
	};
}

export function getUser(id) {
	return dispatch => {
		axios
			.get(`${PATH}/${id}`)
			.then(response => {
				dispatch({ type: GET_USER, payload: response.data });
			})
			.catch(err => {
			});
	};
}
export function addUser(payload) {
	return dispatch => {
		axios
			.post(`${PATH}`, payload)
			.then(response => {
				if(response.data.error){
					toast.error(response.data.message);
				}else{
				toast.success('User created Successfully');
				dispatch({ type: CREATE_USER, payload: response.data });
				}
			})
			.catch(err => {
				toast.error('Unable to create User');
			});
	};
}
export function updateUser(id, payload) {
	return dispatch => {
		axios
			.put(`${PATH}/${id}`, payload)
			.then(response => {
				if(response.data.error){
					toast.error(response.data.message);
				}else{
				toast.success('User updated Successfully');
				dispatch({ type: UPDATE_USER, payload: response.data });
				setTimeout(()=>{
                    dispatch({ type:URER_REDIRECT_URI, payload: response.data });
				},500)
			}
			})
			.catch(err => {
				toast.error('Unable to update User');
			});
	};
}

export function deleteUser(id) {
	return dispatch => {
		axios
			.delete(`${PATH}/${id}`)
			.then(response => {
				toast.success('User deleted Successfully');
				dispatch({ type: DELETE_USER, payload: response.data });
				dispatch(getUsers());
				userActionPerformed(dispatch);
			})
			.catch(err => {
			});
	};
}


export function resetUserPassword(id, payload) {
	return dispatch => {
		axios
			.put(`${PATH}/user/${id}`, payload)
			.then(response => {
				if(response.data.error){
					toast.error(response.data.message);
				}else{
				toast.success('Credentials copied Successfully');
				dispatch({ type: COPY_CREDENTIALS, payload: response.data });
				setTimeout(()=>{
                    dispatch({ type:URER_REDIRECT_URI, payload: response.data });
				},500)
			}
			})
			.catch(err => {
				toast.error('Unable to copy credentials');
			});
	};
}