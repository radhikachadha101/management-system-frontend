import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		padding: '4px',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		width: '540px',
		height: 'auto',
		padding: theme.spacing(2, 2, 2),
	},
}));

export default function TaskEntryModel({ open,task, handleClose,handleTaskSave,editable }) {
	const classes = useStyles();
	const [taskTitle, setTaskTitle] = useState('');
	const [description, setDescription] = useState('');
	const [taskVideoLink, setTaskVideoLink] = useState('');
	const [file, setFile] = useState();
	const [submitted, setSubmitted] = useState(false);



	useEffect(() => {
		if (task) {
			setTaskTitle(task.title ? task.title : '')
			setDescription(task.description ? task.description : '')
			setTaskVideoLink(task.videoLink ? task.videoLink : '')
		}
	}, [task]);

	const handleSubmit = () => {
		setSubmitted(true)
		if(!taskTitle) return
		task.title = taskTitle
		task.description = description
		task.videoLink = taskVideoLink
		task.file = file
		handleTaskSave(task);
	}

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
							<h4 id="transition-modal-title">Task Detail</h4>

							<Button onClick={handleClose}><CloseIcon /></Button>
						</div>
						<div>
							<div>
								<TextField
									required
									disabled={!editable}
									fullWidth
									id="filled-required"
									label="Title"
									onChange={(e) => setTaskTitle(e.target.value)}
									value={taskTitle}
									placeholder="Enter task title"
									variant="outlined"
									aria-describedby="component-error-text"

								/>

							</div>

							<div style={{ margin: '10px 0px' }}>
								<TextField
									id="outlined-multiline-static"
									fullWidth
									multiline
									disabled={!editable}
									rows={4}
									onChange={(e) => setDescription(e.target.value)}
									value={description}
									placeholder="Description"
									variant="outlined"
								/>
								{description && description.length < 20 && <FormHelperText error={true} id="component-error-text">Please add minimum 20 letters</FormHelperText>}

								{/* <FormHelperText id="component-error-text">Error</FormHelperText> */}
							</div>

							<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
								<div style={{ flex: 1.5 }}>
									<TextField
										required
								    	disabled={!editable}
										fullWidth
										value={taskVideoLink}
										onChange={(e) => setTaskVideoLink(e.target.value)}
										id="filled-required"
										placeholder="Paste task video link here"
										variant="outlined"
										aria-describedby="component-error-text"

									/>
								</div>
								<div style={{ margin: '0 10px' }}>
									OR
								</div>
								<div style={{ flex: 1.0 }}>
									<Button
										style={{ width: '100%' }}
										startIcon={<NoteAddIcon />}
										component="label"
							    		disabled={!editable}
									>
										<div style={{ fontSize: '12px', color: 'gray' }}>
											{
												!file ? (<><span>Upload ScreenShot</span>
													<br />
													<span>Max Filesize  1MB</span></>) : (
														<span>
															{file.name}
														</span>
													)
											}

											<input
												type="file"
												onChange={(e) => setFile(e.target.files[0])}
												hidden
											/>
										</div>
									</Button>
								</div>

							</div>

						</div>
						<div style={{ display: 'flex', marginTop: '10px', justifyContent: 'flex-end' }}>
							<Button
								variant="contained"
								onClick={handleClose}
								startIcon={<CloseIcon />}
								component="label"
							    		disabled={!editable}
							>
								Cancel
							 </Button>
							 &nbsp;&nbsp;&nbsp;
							<Button
								variant="contained"
								onClick={handleSubmit}
							    disabled={!editable}
								startIcon={<SaveIcon />}
								component="label"
							>
								Save
						  </Button>
						</div>
					</div>

				</Fade>
			</Modal>
		</div>
	);
}
