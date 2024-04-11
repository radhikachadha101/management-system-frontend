import {
	CREATE_TASK, GET_REPORT_TASK_FAILED, GET_REPORT_TASK_SUCCESS, GET_TASKS, GET_TASK, UPDATE_TASK, GET_REPORT_TASK
} from '../config/actionNames';
const initialState = {
	task: {},
	tasks: [],
	reportTasks: [],
	taskAdded: false,
	taskReportLoading: false,
	loading: false,
};
function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_TASK:
		case UPDATE_TASK:
			return {
				...state,
				task: action.payload,
			};
		case CREATE_TASK:
			return {
				...state,
				task: action.payload,
				taskAdded: true,
			};
		case GET_TASKS:
			return {
				...state,
				tasks: action.payload,
			};
	
		case GET_REPORT_TASK:
			return {
				...state,
				taskReportLoading: true,
			};
		case GET_REPORT_TASK_SUCCESS:
			return {
				...state,
				taskReportLoading: false,
				reportTasks: action.payload,
			};
		case 'UPDATE_REPORTS':
			const reports = [...state.reportTasks];
			reports.find(x => x.id === action.payload.id).approvedStatusId = action.payload.approvedStatusId;
			return {
				...state,
				// reportTasks: [state.reportTasks.filter(x => x.id !=action.payload.id), ...action.payload],
				reportTasks: reports,

			};
		case GET_REPORT_TASK_FAILED:
			return {
				...state,
				taskReportLoading: false,
			};
		default:
			return state;
	}
};
export default reducer;
