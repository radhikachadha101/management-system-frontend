import React, { useEffect, useState } from 'react'
import { withStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import { getUnreadComments } from '../../actions/commentActions';


import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import TaskEntryModel from './TaskEntryModal';

import DollarIcon from '@material-ui/icons/AttachMoney'
import Button from '@material-ui/core/Button';
import StartIcon from '@material-ui/icons/PlayArrow';
import ListIcon from '@material-ui/icons/List';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';

import ClockIcon from '@material-ui/icons/QueryBuilder';
import DescriptionIcon from '@material-ui/icons/Description';
import TimeSheetTable from './Table';
import ControlPointOutlinedIcon from '@material-ui/icons/ControlPointOutlined';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Checkbox } from '@material-ui/core';
import getConnect from '../Common/connect';
import NativeSelect from '@material-ui/core/NativeSelect';
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
  } from '@material-ui/pickers';
  import { toast } from 'react-toastify';
  import moment from 'moment';
  import TextField from '@material-ui/core/TextField';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const BorderedCell = withStyles((theme) => ({
	head: {
		border: '1px solid lightgray'
	},
	body: {
		fontSize: 14,
		background: 'red',
		border: '1px solid lightgray'
	},
}))(TableCell);


const Index = ({ getTasks, getProjects, tasks, projects, addComment, addTask, updateTask, getTask, getInProgressTask, task }) => {
	const [title, setTitle] = useState('Test Title');
	const [projectId, setProjectId] = useState('');
	const [isBillable, setIsBillable] = useState(false);
	const [checkIn, setCheckIn] = useState();
	const [checkOut, setCheckOut] = useState();
	const [clockedTime, setClockedTime] = useState(0);
	const [isTracking, setIsTracking] = useState(false);
	const [intervalId, setIntervalId] = useState(null);
	const [open, setOpen] = useState(false);
	const [modelOpen, setModelOpen] = useState(false);
	const [project, setProject] = useState();
	const [taskDetail, setTaskDetail] = useState('');
	const [projectError, setProjectError] = useState('');
	const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
	const [startTime, setStartTimeDate] = useState(moment().format("HH:mm"));
	const [endTime, setEndTimeDate] = useState(moment().format("HH:mm"));
	const [isManual, setIsManual] = useState(false);
	const [unReadCommentsMap, setUnReadCommentsMap] = useState({})

	useEffect(() => {
		getProjects();
		getTasks();
	}, [getTasks])

	useEffect(() => {
		// Fetch INPROGRESS Task,
		getInProgressTask();
	}, []);

	useEffect(() => {
		if (projects && projects[0] && task && task.id) {
			let currentProject = projects[0].data.find(p => p.id == task.projectId)
			setProject(currentProject)
			setProjectId(task.projectId)
			let startTime = new Date(task.startedAt).getTime()
			let currentTime = new Date().getTime();
			let clockedTime = Math.floor((currentTime - Number(startTime)) / 1000)

			if (startTime && !isTracking && !isManual) {
				setTaskDetail(task)
				setClockedTime(clockedTime)
				setIsTracking(true)
				startTimer()
				setCheckIn(task.startedAt)
				setIsBillable(task.isBillable)
			}
		}

	}, [task, projects]);

	useEffect(() => {
		if (tasks.length > 0) {
			getUnreadCommentsFromServer();
		}
	}, [tasks]);

	const getUnreadCommentsFromServer = async () => {
		const taskIds = tasks.map((task) => task.id);
		const response = await getUnreadComments({
			taskIds: taskIds.join(','),
		});

		const unreadComments = response.data;
		let map = {};
		unreadComments.forEach(
			(comment) => map[comment.timeEntryId] = comment.unreadCommentsCount
		)
		setUnReadCommentsMap(map);
	};

	const formatTime = (timer) => {
		const getSeconds = `0${(timer % 60)}`.slice(-2)
		const minutes = `${Math.floor(timer / 60)}`
		const getMinutes = `0${minutes % 60}`.slice(-2)
		const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

		return `${getHours} : ${getMinutes} : ${getSeconds}`
	}

	const startTimer = () => {
		let interval = setInterval(() => {
			handleTimer();
		}, 1000);
		setIntervalId(interval)
	}

	const handleTimer = () => {
		setClockedTime(clockedTime => {
			return clockedTime + 1
		})
	}

	const handleSubmit = async () => {
		let project_error = '';
		project_error = projectId === '' ? 'Select Project' : ''
		setProjectError(project_error)
		if (projectId === '') {
			return false;
		}

		if(isManual){
			let clocked_time=0
			let start= startTime.split(":")
			let end= endTime.split(":")

			let selected_date= new Date(selectedDate)
			let selected_starttime= new Date()
			let selected_endtime= new Date()

			selected_starttime.setFullYear(selected_date.getFullYear())
			selected_starttime.setMonth(selected_date.getMonth())
			selected_starttime.setDate(selected_date.getDate())
			selected_starttime.setHours(start[0])
			selected_starttime.setMinutes(start[1])
			selected_starttime.setSeconds("00")

			selected_endtime.setFullYear(selected_date.getFullYear())
			selected_endtime.setMonth(selected_date.getMonth())
			selected_endtime.setDate(selected_date.getDate())
			selected_endtime.setHours(end[0])
			selected_endtime.setMinutes(end[1])
			selected_endtime.setSeconds("00")

			if(selected_endtime.getTime() > selected_starttime.getTime()){
				let clocked_time= Math.floor((selected_endtime.getTime() - selected_starttime.getTime()) / 1000)
				setClockedTime(clocked_time)
			} else {
				toast.error('End time must be greater then start time')
				return false;
			}

			let payLoad = {
				"description": taskDetail.description,
				"title": taskDetail.title,
				"videoLink": taskDetail.videoLink,
				"projectId": project.id,
				"startedAt": selected_starttime,
				"approvedStatusId": 3,
				"completedAt": selected_endtime,
				"clockedTime": clocked_time,
				"isBillable": isBillable,
				"isManual": isManual
			}
			let res = await addTask(payLoad);
			if (res) {
				setClockedTime(0)
				setIsBillable(false)
				setTaskDetail('')
				setProject('')
				setProjectId('')
				setSelectedDate(new Date())
				setStartTimeDate(new Date())
				setEndTimeDate(new Date())
				getTasks();
			}

		} else {

			if (isTracking) {

				let currentTime = new Date();
				setIsTracking(false)
				setCheckOut(currentTime)
				setTimeout(async () => {
					let payLoad = {
						"description": taskDetail.description,
						"title": taskDetail.title,
						"videoLink": taskDetail.videoLink,
						"projectId": project.id,
						"approvedStatusId": 3,
						"completedAt": currentTime,
						"clockedTime": clockedTime,
						"isBillable": isBillable,
						"isManual": isManual
					}
					let res= await updateTask(taskDetail.id,payLoad)
					if(res){
						clearInterval(intervalId)
						setClockedTime(0)
						setIsBillable(false)
						setTaskDetail('')
						setProject('')
						setProjectId('')
						getTasks();
					}
				}, 500);
				return;
			}

			let currentTime = new Date();
			setIsTracking(true)
			setCheckIn(currentTime)
			startTimer()
			let payLoad = {
				"description": taskDetail.description,
				"title": taskDetail.title,
				"videoLink": taskDetail.videoLink,
				"projectId": project.id,
				"startedAt": currentTime,
				"approvedStatusId": 2,
				"clockedTime": clockedTime,
				"isBillable": isBillable,
				"isManual": isManual
			}
			let res = await addTask(payLoad);
			if(res){
				setTaskDetail(res)
			}
		}
	}


	const handleProjectChange = (evt) => {
		setProjectId(evt.target.value);
		let currentProject = projects[0].data.find(p => p.id == evt.target.value)
		setProject(currentProject)
		let project_error = '';

		project_error = evt.target.value === 0 ? 'Select Project' : ''

		setProjectError(project_error)
	}

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	const handleStartTimeChange = (start_time) => {

		setStartTimeDate(start_time);
		let start= start_time.split(":")
		let end= endTime.split(":")

		let selected_date= new Date(selectedDate)
		let selected_starttime= new Date()
		let selected_endtime= new Date()
		
		selected_starttime.setFullYear(selected_date.getFullYear())
		selected_starttime.setMonth(selected_date.getMonth())
		selected_starttime.setDate(selected_date.getDate())
		selected_starttime.setHours(start[0])
		selected_starttime.setMinutes(start[1])
		selected_starttime.setSeconds("00")

		selected_endtime.setFullYear(selected_date.getFullYear())
		selected_endtime.setMonth(selected_date.getMonth())
		selected_endtime.setDate(selected_date.getDate())
		selected_endtime.setHours(end[0])
		selected_endtime.setMinutes(end[1])
		selected_endtime.setSeconds("00")

		if(selected_endtime.getTime() > selected_starttime.getTime()){
			let clockedTime= Math.floor((selected_endtime.getTime() - selected_starttime.getTime()) / 1000)
			setClockedTime(clockedTime)
		} else {
			toast.error('End time must be greater then start time')
		}
	};

	const handleEndTimeChange = (end_time) => {

		setEndTimeDate(end_time);
		let start= startTime.split(":")
		let end= end_time.split(":")

		let selected_date= new Date(selectedDate)
		let selected_starttime= new Date()
		let selected_endtime= new Date()

		selected_starttime.setFullYear(selected_date.getFullYear())
		selected_starttime.setMonth(selected_date.getMonth())
		selected_starttime.setDate(selected_date.getDate())
		selected_starttime.setHours(start[0])
		selected_starttime.setMinutes(start[1])
		selected_starttime.setSeconds("00")

		selected_endtime.setFullYear(selected_date.getFullYear())
		selected_endtime.setMonth(selected_date.getMonth())
		selected_endtime.setDate(selected_date.getDate())
		selected_endtime.setHours(end[0])
		selected_endtime.setMinutes(end[1])
		selected_endtime.setSeconds("00")

		if(selected_endtime.getTime() > selected_starttime.getTime()){
			let clockedTime= Math.floor((selected_endtime.getTime() - selected_starttime.getTime()) / 1000)
			setClockedTime(clockedTime)
		} else {
			toast.error('End time must be greater then start time')
		}
	};


	return (
		<div className="timesheet">
			      {/* <div className="make-entry-row">
      
        <div className="make-billable">
          <Checkbox
            icon={<DollarIcon />}
            checkedIcon={<DollarIcon />}
            onChange={(e) => setIsBillable(e.target.checked)}
            name="isBillable"
            checked={isBillable}
          />
        </div>
        
        <div className="make-select-project" >
		<Select native
		input={<Input disableUnderline />}
		defaultValue="" >
          <option aria-label="None" value="" />
          {projects[0] && projects[0].data.map((project) => (
            <option key={project.name} name={project.name} value={project.id}>	{project.name}
			</option>
		
													
												
												))}
           
         
        </Select>
        </div>

	
		<div
		className="make-project-detail"
		style={{
			display: "flex",
			cursor: "pointer",
			justifyContent: "space-between",
		}}
		className=""
		onClick={() => {
			setModelOpen(true);
		}}
		>
		<p>{taskDetail ? taskDetail.title : "What are you working"} </p>
		<DescriptionIcon />
		</div>
        
      </div> */}
			<div>
				<div className="">
					<TableContainer component={Paper}>
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<BorderedCell align="left">
										<Checkbox
											icon={<DollarIcon />}
											checkedIcon={<DollarIcon />}
											onChange={(e) => setIsBillable(e.target.checked)}
											name="isBillable"
											checked={isBillable}
										/>
									</BorderedCell>
									<BorderedCell align="center" style={{ cursor: 'pointer' }}>

										<FormControl style={{ position: 'relative', minWidth: '100px', height: '100%' }}>
											<div style={{ display: 'flex', display: 'flex', background: '#ffffff', zIndex: '1', width: '100%', height: '40px' }} onClick={() => setOpen(!open)}>
												<ControlPointOutlinedIcon />
												<span htmlFor="age-native-simple">{project ? project.name : 'Select Project'}</span>
											</div>

											<Select style={{ position: 'absolute' }}

												labelId="demo-mutiple-name-label"
												id="demo-mutiple-name"
												value={projectId}
												onChange={handleProjectChange}
												input={<Input />}
												open={open}
												onClose={() => setOpen(false)}
												MenuProps={MenuProps}
											>

												{projects[0] && projects[0].data.map((project) => (
													<MenuItem key={project.name} name={project.name} value={project.id}>
														{project.name}
													</MenuItem>
												))}
											</Select>
											{projectError != '' && (
												<span className="error">
													{projectError}
												</span>)}
										</FormControl>
									</BorderedCell>

									<BorderedCell align="center">
										<div
											style={{ display: 'flex', cursor: 'pointer', justifyContent: 'space-between' }}
											onClick={() => { setModelOpen(true); }}>
											{taskDetail ? (taskDetail.title) : ("What are you working")}<DescriptionIcon />
										</div>
									</BorderedCell>
									{isManual && (
										<BorderedCell  style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
											<form noValidate>
												<TextField
												disableUnderline={true}
													id="datetime-local"
													type="date"
													onBlur={(e, d) => {
														handleDateChange(e.target.value)
													}}
													defaultValue={selectedDate}
													InputLabelProps={{
														shrink: true,
													}}
												/>
											</form>
											
											<form noValidate>
												<TextField
												disableUnderline={true}
													id="datetime-local"
													type="time"
													onBlur={(e, d) => {
														handleStartTimeChange(e.target.value)
													}}
													defaultValue={startTime}
													InputLabelProps={{
														shrink: true,
													}}
												/>
											</form>

											<form noValidate>
												<TextField
												disableUnderline={true}
													id="datetime-local"
													type="time"
													onBlur={(e, d) => {
														handleEndTimeChange(e.target.value)
													}}
													defaultValue={endTime}
													InputLabelProps={{
														shrink: true,
													}}
												/>
											</form>
										</BorderedCell>
									)}

									<BorderedCell align="center" style={{ minWidth: '110px' }}>{formatTime(clockedTime)}</BorderedCell>
									<BorderedCell align="center">
										{!isManual && (
											<Button variant="contained"

												startIcon={<StartIcon />}
												// color="#000000"
												onClick={() => handleSubmit()}
											>
												{isTracking ? 'Stop' : 'Start'}
											</Button>
										)}

										{isManual && (
											<Button variant="contained"

												startIcon={<StartIcon />}
												onClick={() => handleSubmit()}
											>
												Add
											</Button>
										)}

									</BorderedCell>

									<BorderedCell align="center" style={{ display: 'flex', flexDirection: 'column' }}>
										<Checkbox
											icon={<ClockIcon />}
											checkedIcon={<ClockIcon />}
											onChange={(e) => {
												if (!isTracking) {
													setIsManual(false);
													setClockedTime(0)
												}
											}}
											checked={!isManual}
										/>
										<Checkbox
											icon={<ListIcon />}
											checkedIcon={<ListIcon />}
											onChange={(e) => { if (!isTracking) { setIsManual(true) } }}
											checked={isManual}
										/>
									
									</BorderedCell>

								</TableRow>
							</TableHead>
						</Table>
					</TableContainer>
				</div>



				<div className="timesheet__table">
					<TimeSheetTable tasks={tasks} unReadCommentsMap={unReadCommentsMap} updateTask={updateTask} />
				</div>
			</div>

			<div>
				<TaskEntryModel open={modelOpen} editable={true} task={task} handleTaskSave={(task) => { setTaskDetail(task); setModelOpen(false) }} handleClose={() => setModelOpen(false)} />
			</div>


		</div>

	)
}

export default getConnect(Index)
