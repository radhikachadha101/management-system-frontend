import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import ReportRow from './ReportRow';
const columns = [
	{ id: 'name', label: 'Name', minWidth: 200 },
	{ id: 'task-description', label: 'Task description', minWidth: 250, maxWidth: 500 },
	{
		id: 'client-detail',
		label: 'Client Detail',
		minWidth: 200,
	},
	{
		id: 'time/date',
		label: 'Time / Date',
		align: 'center',
		minWidth: 50,
		maxWidth: 50,
	},
	{
		id: 'duration',
		label: 'Duration',
		align: 'center',
	},
	{
		id: 'actions',
		label: 'Actions',
		align: 'left',

	},
];


const AppTableHead = () => (
	<TableHead >
		<TableRow className="table__head">
			{columns.map((column) => (
				<TableCell
					className="table__head__cell"
					key={column.id}
					size={column.size}
					align={column.align}
					style={{ minWidth: column.minWidth }}
				>
					{column.label}
				</TableCell>
			))}
		</TableRow>
</TableHead>)


const ReportTable = (props) => {

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const { reportTasks } = props;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper>
			<TableContainer>
				<Table stickyHeader aria-label="sticky table">
					<AppTableHead/>
					<TableBody>
						{reportTasks
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((task) => {
								return <ReportRow
									approveTask={props.approveTask}
									viewReport={props.viewReport}
							     	key={task.id} task={task} />;
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={reportTasks.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};

export default ReportTable;
