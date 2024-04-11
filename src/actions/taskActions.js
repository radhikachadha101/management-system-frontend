import axios from 'axios';
import {
	CREATE_TASK,
	GET_TASKS,
	GET_REPORT_TASK,
	GET_REPORT_TASK_FAILED,
	GET_REPORT_TASK_SUCCESS,
	GET_TASK,
	UPDATE_TASK,
	DELETE_TASK,
	GET_UNREADCOMMENTS
} from '../config/actionNames';
import { api } from '../config/env';
import { toast } from 'react-toastify';
const PATH = `${api}api/tasks`;
export function getTasks(params) {
	return (dispatch) => {
		axios
			.get(`${PATH}`, { params })
			.then((response) => {
				dispatch({ type: GET_TASKS, payload: response.data });
			})
			.catch((err) => { });
	};
}

export function getTaskReports(params) {
	return (dispatch) => {
		dispatch({ type: GET_REPORT_TASK });
		axios
			.get(`${PATH}/reports`, { params })
			.then((response) => {
				dispatch({ type: GET_REPORT_TASK_SUCCESS, payload: response.data });
			})
			.catch((err) => {
				dispatch({
					type: GET_REPORT_TASK_FAILED,
				});
			});
	};
}

export const getInProgressTask = () => {
	return (dispatch) => {
		axios
			.get(`${PATH}/inprogress`)
			.then((response) => {
				dispatch({ type: GET_TASK, payload: response.data });
			})
			.catch((err) => { });
	};
};

export function getTask(id) {
	return (dispatch) => {
		axios
			.get(`${PATH}/${id}`)
			.then((response) => {
				dispatch({ type: GET_TASK, payload: response.data });
			})
			.catch((err) => { });
	};
}
export function addTask(payload) {
	return (dispatch) => {
		return axios
			.post(`${PATH}`, payload)
			.then((response) => {
				dispatch({ type: CREATE_TASK, payload: response.data });
				toast.success('Task created Successfully');
				return response.data;
			})
			.catch((err) => {
				return false;
			});
	};
}
export function updateTask(id, payload) {
	return (dispatch) => {
		return axios
			.put(`${PATH}/${id}`, payload)
			.then((response) => {
				// dispatch({ type: UPDATE_TASK, payload: response.data });
				if (response.data) {
					toast.success('Task updated Successfully');
					return response.data;
				} else {
					toast.error('Something went wrong');
				}
			})
			.catch((err) => {
				return false;
			});
	};
}

export function updateTaskReport(id, payload) {
	return (dispatch) => {
		return axios
			.put(`${PATH}/${id}`, payload)
			.then((response) => {
				if (response.data) {
					dispatch({ type: 'UPDATE_REPORTS', payload: response.data });
					toast.success('Task updated Successfully');
					return response.data;
				} else {
					toast.error('Something went wrong');
				}
			})
			.catch((err) => {
				return false;
			});
	};
}

export function deleteTask(id) {
	return (dispatch) => {
		axios
			.delete(`${PATH}/${id}`)
			.then((response) => {
				dispatch({ type: DELETE_TASK, payload: response.data });
				dispatch(getTasks());
				toast.success('Task deleted Successfully');
			})
			.catch((err) => { });
	};
}
