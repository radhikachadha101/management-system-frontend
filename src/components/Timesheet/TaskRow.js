import React, { useState, useEffect } from 'react'

import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button'
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles, styled } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DollarIcon from '@material-ui/icons/AttachMoney'
import TextField from '@material-ui/core/TextField';
import CreateIcon from '@material-ui/icons/Create';
import DateRangeIcon from '@material-ui/icons/DateRange';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import CommentIcon from '@material-ui/icons/ChatBubble';
import Badge from '@material-ui/core/Badge';
import ErrorIcon from '@material-ui/icons/Error';
import Comments from './Comments';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import TaskEntryModel from './TaskEntryModal';
import moment from 'moment';
import { ReactComponent as BulkEdit } from '../../icons/bulk-edit.svg';
import { ReactComponent as ChatIcon } from '../../icons/chat-icon.svg';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import { getComments, addComment, updateComment } from '../../actions/commentActions';
import { toast } from 'react-toastify';

const FlexRow = styled('div')({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '0px 10px'
});

const BorderedDiv = styled('div')({
	display: 'flex',
	border: '1px solid lightgray',
	alignItems: 'center'
});

export const BorderedCell = withStyles((theme) => ({

	body: {
		fontSize: 14,
		border: '1px solid lightgray'
	},
}))(TableCell);



const TaskRow = ({ task, updateTask, unReadCommentsCount }) => {
	const [showComments, setShowComments] = useState(false);
	const [commentsFetched, setCommentsFetched] = useState(false);
	const [comments, setComments] = useState([]);
	const [taskEditView, setTaskEditView] = useState();
	const [description, setDescription] = useState(task.description);
	const [modelOpen, setModelOpen] = useState(false);
	const [tmpTask, setTmpTask] = useState(task);
	const [startSelectedDate, setStartSelectedDate] = useState();
	const [endSelectedDate, setEndSelectedDate] = useState(new Date());
	const [localUnReadCommentsCount, setLocalUnReadCommentsCount] = useState(0);
	const [taskStatus, settaskStatus] = useState(task.approvedStatusId);
	const [isBillable, setIsBillable] = useState(task.isBillable);

	useEffect(() => {
		if (unReadCommentsCount)
			setLocalUnReadCommentsCount(unReadCommentsCount);
	}, [unReadCommentsCount])
	const toggleCommentsView = () => {
		if (!commentsFetched) {
			fetchComments();
			setLocalUnReadCommentsCount(0);

		}
		setShowComments((showComments => !showComments));
	}

	// Fetch comments for given time entry
	const fetchComments = async () => {
		const comments = await getComments({ timeEntryId: task.id });
		if (comments) {
			setComments(comments.data);
			setCommentsFetched(true);
		}
	}

	const handleTaskSave = ({ id, description, videoLink, title }) => {
		updateTask(id, { id, description, videoLink, title })
		setModelOpen(false)
	}

	// Update comment to soft delete
	const handleDeleteComment = async (id) => {
		await updateComment(id, { active: false });
		fetchComments();
	}

	const handleAddComment = async (comment, onCommentSuccess) => {
		const payload = {
			comment,
			timeEntryId: task.id,
			active: true,
		}
		const response = await addComment(payload);
		if (response.status === 200) {
			onCommentSuccess();
			fetchComments();
		}

	}

	const changeTaskStatus = () => {
		settaskStatus(1)
	}

	const getDuration = (start, end) => {
		const duration = moment.duration(moment(end).diff(moment(start)));
		if (!duration._isValid) {
			return '00:00';
		} else {
			let { _milliseconds } = duration
			let timer = _milliseconds / 1000
			const minutes = `${Math.floor(timer / 60)}`
			const getMinutes = `0${minutes % 60}`.slice(-2)
			const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

			return `${getHours}:${getMinutes}`
		}
	}



	return (
		<>
			<div className="entries-row">
				<div className={`task-state ${taskStatus !== 1 ? "test1" : "test2"}`} onClick={() => changeTaskStatus()}>{
					task.approvedStatusId !== 1 ? (<ErrorIcon color="secondary" />) : (
						<CheckCircleOutlineIcon color="primary" style={{ color: 'green' }} />
					)
				}</div>
				<div className={`task-income ${isBillable ? "billable" : "non-billable"}`} align="left" onClick={(isBillable) => setIsBillable((isBillable => !isBillable))}><DollarIcon /></div>


				<React.Fragment key={task.name} >
					<div className="project-name"><p>{task.Projects.name}</p></div>
					<div className="task-desc" onClick={() => { setModelOpen(true) }}>
						<p>{task.description}</p>
						<BulkEdit className="tesk-edit" />
					</div>
				</React.Fragment>


				{/* start time tab */}
				<div className="start-time">
					<form noValidate>
						<TextField
							disableUnderline={true}
							id="datetime-local"
							type="time"
							onBlur={(e, d) => {
								if (moment(task.startedAt).format("HH:mm") == e.target.value) {
									return;
								}
								let start_time = new Date(moment(task.startedAt).format("YYYY-MM-DD") + ' ' + e.target.value + ':00')
								let completed_time = new Date(task.completedAt)
								console.log(start_time)
								console.log(completed_time)
								if (start_time > completed_time) {
									toast.error('End time must be greater then start time')
									return false;
								}
								updateTask(task.id, { startedAt: start_time })
							}}
							defaultValue={moment(task.startedAt).format("HH:mm")}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</form>

				</div>

				{/* end timetab */}
				<div className="end-time">
					<form noValidate>
						<TextField
							id="datetime-local"
							type="time"
							onBlur={(e, d) => {
								if (moment(task.completedAt).format("HH:mm") == e.target.value) {
									return;
								}
								let completed_time = new Date(moment(task.completedAt).format("YYYY-MM-DD") + ' ' + e.target.value + ':00')
								let start_time = new Date(task.startedAt)
								console.log(start_time)
								console.log(completed_time)
								if (start_time > completed_time) {
									toast.error('End time must be greater then start time')
									return false;
								}
								updateTask(task.id, { completedAt: completed_time })
							}}
							defaultValue={moment(task.completedAt).format("HH:mm")}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</form>

				</div>


				{/* task date */}




				<div className="task-date">
					<form noValidate>
						<TextField
							disableToolbar
							id="datetime-local"
							type="date"

							onBlur={(e) => {
								if (moment(task.startedAt).format("YYYY-MM-DD") == e.target.value) {
									return;
								}
								let start_datetime = new Date(e.target.value + ' ' + moment(task.startedAt).format("HH:mm:ss"))
								let complete_datetime = new Date(e.target.value + ' ' + moment(task.completedAt).format("HH:mm:ss"))
								updateTask(task.id, { startedAt: start_datetime, completedAt: complete_datetime })
							}}
							defaultValue={moment(task.startedAt).format("YYYY-MM-DD")}
							InputLabelProps={{
								shrink: true,

							}}
						/>
					</form>

				</div>

				{/* task duration */}
				<div className="task-duration">
					<h6>{getDuration(task.startedAt, task.completedAt)}</h6>
				</div>




				<div className="task-date">
					<form noValidate>
						<TextField
							disableToolbar
							id="datetime-local"
							type="date"

							onBlur={(e) => {
								if (moment(task.completedAt).isSame(e.target.value)) {
									return;
								}
								updateTask(task.id, { completedAt: e.target.value })
							}}
							defaultValue={moment(task.completedAt).format("YYYY-MM-DD")}
							InputLabelProps={{
								shrink: true,

							}}
						/>
					</form>

				</div>

				{/* task duration */}
				<div className="task-duration">
					<h6>08:30</h6>
				</div>


				{/* commnt icon */}
				<div className="cmt-btn">
					<IconButton onClick={toggleCommentsView}>
						<Badge badgeContent={localUnReadCommentsCount} color="secondary">
							<ChatIcon />
						</Badge>
					</IconButton>
				</div>

				<div className="entry-more">
					<MoreVertIcon />
				</div>







			</div>
			<div>
				{showComments && <Comments
					timeEntryId={task.id}
					deleteComment={handleDeleteComment}
					addComment={handleAddComment}
					comments={comments} />}
			</div>
			<div>
				<TaskEntryModel
					open={modelOpen}
					editable={true}
					task={task}
					handleTaskSave={handleTaskSave}
					handleClose={() => setModelOpen(false)} />
			</div>
		</>
	)
}

export default TaskRow
