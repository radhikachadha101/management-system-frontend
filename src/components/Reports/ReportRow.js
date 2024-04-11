import React,{useState} from 'react';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import CommentIcon from '@material-ui/icons/ChatBubble';
import Badge from '@material-ui/core/Badge';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';
import { getComments, addComment, updateComment } from '../../actions/commentActions';
import Comments from '../Timesheet/Comments';



function Row(props) {
	const { task, approveTask, viewReport } = props;
	const [showComments, setShowComments] = useState(false);
	const [comments, setComments] = useState([]);


	const toggleCommentsView = () => {
		if (!showComments) {
			fetchComments();
		}
		setShowComments((showComments => !showComments));
	}

	// Fetch comments for given time entry
	const fetchComments = async () => {
		const comments = await getComments({ timeEntryId: task.id });
		if (comments) {
			setComments(comments.data);
		}
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


	const getDuration = (start, end) => {
		const duration = moment.duration(moment(end).diff(moment(start)));
		if (!duration._isValid) {
			return '';
		} else {
			const { _data } = duration
			return `${_data.hours < 10 ? '0' + _data.hours : _data.hours || '00'}:${_data.minutes < 10 ? '0' + _data.minutes : _data.minutes || '00'}`
			}
       }

	const getTime = (start, end) => {
		if (!start || !end) {
			return 'Invalid date';
		}
		return `${moment(start).format('hh:mm A')}  -  ${moment(end).format('hh:mm A')}
									`
	}


	// call this function, passing-in your date
	const dateToFromNow = (myDate) => {

		// get from-now for this date
		var fromNow = moment(myDate).fromNow();

		// ensure the date is displayed with today and yesterday
		return moment(myDate).calendar(null, {
			// when the date is closer, specify custom values
			lastWeek: '[Last] dddd',
			lastDay: '[Yesterday]',
			sameDay: '[Today]',
			nextDay: '[Tomorrow]',
			nextWeek: 'dddd',
			// when the date is further away, use from-now functionality
			sameElse: function () {
				return "[" + fromNow + "]";
			}
		});
	}


	return (
		<React.Fragment>
			<TableRow className="table__row">
				<TableCell component="th" scope="row">
					{task.userInfo.firstName} {task.userInfo.lastName}
				</TableCell>
				<TableCell align="left">{task.description}</TableCell>
				<TableCell align="left">{task.Projects.name}</TableCell>
				<TableCell align="center">{getTime(task.startedAt, task.completedAt)}<br/>
					{dateToFromNow(task.startedAt)}</TableCell>
				<TableCell align="center">
					{getDuration(task.startedAt, task.completedAt)}
					</TableCell>
				<TableCell align="right">
					{/* Actions */}
					<div className="actions">

						{/* Comments */}
						<div>
							<IconButton onClick={toggleCommentsView}>
								<Badge badgeContent={task.unreadCommentsCount} color="secondary">
									<CommentIcon />
								</Badge>
							</IconButton>
						</div>

						{/* Visible */}
						<div>
							<Button onClick={() => viewReport(task)}>
								<VisibilityIcon />
							</Button>
						</div>

						{/* Approved */}
						<div className="approve">
							{task.approvedStatusId !== 1 ? (
								<Button
									variant="contained"
									onClick={() => approveTask(task.id)}
									style={{
										backgroundColor: 'rgba(255, 92, 0, 0.8)',
										width: '92px',
									}}
								>
									Approve
								</Button>
							) : (
									<Button
										variant="contained"
										style={{
											backgroundColor: '#3AC47D',
											width: '92px',
											color: 'white',
										}}
									>
										Approved
									</Button>
								)}
						</div>
					</div>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={showComments} timeout="auto" unmountOnExit>
						<Comments
							timeEntryId={task.id}
							deleteComment={handleDeleteComment}
							addComment={handleAddComment}
							comments={comments}
						/>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

export default Row;
