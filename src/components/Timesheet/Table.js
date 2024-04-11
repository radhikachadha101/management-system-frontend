import React from 'react';
import './Timesheet.scss';

import { makeStyles, withStyles, styled } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import DollarIcon from '@material-ui/icons/AttachMoney'
import CreateIcon from '@material-ui/icons/Create';
import DateRangeIcon from '@material-ui/icons/DateRange';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import CommentIcon from '@material-ui/icons/ChatBubble';
import Badge from '@material-ui/core/Badge';
import ErrorIcon from '@material-ui/icons/Error';
import Comments from './Comments';
import TaskRow from './TaskRow';
import {ReactComponent as BulkEdit} from '../../icons/bulk-edit.svg';
const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

const FlexRow = styled('div')({
	display: 'flex',
	justifyContent: 'space-between'
});


export const BorderedCell = withStyles((theme) => ({

	body: {
		fontSize: 14,
		border: '1px solid lightgray'
	},
}))(TableCell);

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: 'lightgray',
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);



export default function TimeSheetTable({tasks,updateTask,unReadCommentsMap}) {
	const classes = useStyles();

	return (
		<div className="entries-wrapper"  component={Paper}>
			<div className="text" >
				<FlexRow className="entries-header">
						<div className="entry-date">Today</div>	
						<div className="entry-header-info">				
						<div className="non-bill-hrs" ><span>Non Billable:</span> 03:00 </div>
						<div className="bill-hrs" ><span>Billable:</span> 05:30 </div>
						<div  className="total-hrs"><span>Total:</span>  8:30  </div>
						<div  className="bulk-edit"> <BulkEdit /> </div>
						</div>
				</FlexRow>
				<div >
					{tasks.map((row) => (
						<TaskRow key={row.id} unReadCommentsCount={unReadCommentsMap[row.id]} task={row} updateTask={updateTask}/>
					))}
				</div>
			</div>
		</div>
	);
}
