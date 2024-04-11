import { Button, Checkbox, Container, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, IconButton  } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete"
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TableRow from '@material-ui/core/TableRow';  
import Paper from '@material-ui/core/Paper';  
import { PureComponent } from "react";
import moment from "moment";
import React  from 'react';
import getConnect from '../Common/connect';
class User extends PureComponent {
    constructor(props) {
        super(props)
        this.state= {
            description: '',
            project: 0,
            isBillable: false,
            clockedTime: 0,
            userId: null,
            istracking: false,
            startTime : null,
            endTime: null,
            tasks: [],
            projects: [],
            errors: {
                description: '',
                project: ''
            },
            createdBy: 4
        }
        // this.columns = [
        //     { field: 'description', headerName: 'Description', width: 300 },
        //     { field: 'Project.project_name', headerName: 'Project', width: 300 },
        //     { field: 'startedAt', headerName: 'Start Time', width: 300 },
        //     { field: 'completedAt', headerName: 'End Time', width: 300 },
        //     {
        //       field: 'isBillable',
        //       headerName: 'Billable',
        //       width: 90,
        //     },
        //     {
        //       field: 'clockedTime',
        //       headerName: 'Clocked Time',
        //       width: 100
        //     }
        //   ];
          
    }

    componentDidMount() {
        this.props.getProjects();
        this.props.getTasks();
        let startTime= localStorage.getItem('startTime')
        let currentTime= new Date().getTime();
        let clockedTime = Math.floor((currentTime - Number(startTime))/1000)
        
        if(startTime){
            let d = new Date()
            d.setTime(Number(startTime))
            this.setState({
                startTime: d,
                clockedTime: clockedTime,
                istracking: true
            })
            setTimeout(() => {
                this.startTimer()
            }, 500);
            
        }
       
    }
    
    formatTime = (timer) => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes = `${Math.floor(timer / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
      
        return `${getHours} : ${getMinutes} : ${getSeconds}`
      }
      

    handleChange = (event) => {
        const name = event.target.name;
        var value;
       
        if(name === "isBillable"){
            value = event.target.checked;
        }else{
            value = event.target.value;
        }
        let state= this.state
        let errors= this.state.errors
        state[name]= value
        if(name === "description" && value !== ''){
            errors[name]= ''
        }
        if(name === "project" && value !== 0){
            errors[name]= ''
        }
        state.errors= errors
        this.setState(state)
    }

    handleDelete = (id) => {
        this.props.deleteTask(id);
    }

    startTimer () {
        this.intervalID= setInterval(() => {
            let timer = this.state.clockedTime + 1 ;
            this.setState({
                clockedTime: timer
            })
        }, 1000);
    }

    handleSubmit= async () => {
        if(!this.state.istracking){
            let currentTime = new Date();
            localStorage.setItem("startTime", currentTime.getTime())
            this.setState({
                istracking: true,
                startTime: currentTime
            })
          this.startTimer()
          setTimeout(() => {
        }, 500);
        }else{
            let description_error = '';
            let project_error = '';

            description_error= this.state.description === '' ? 'Add description' : ''
            project_error= this.state.project === 0 ? 'Select Project' : ''

            this.setState({
                errors: {
                    description: description_error,
                    project: project_error
                }
            })

            if(this.state.description === '' || this.state.project === 0){
                return false;
            }
            clearInterval(this.intervalID)
            let currentTime = new Date();
            this.setState({
                istracking: false,
                endTime: currentTime
            })
            localStorage.removeItem("startTime");
            setTimeout( async () => {
                let payLoad= {
                    "description": this.state.description,
                    "projectId": this.state.project,
                    "startedAt": this.state.startTime,
                    "completedAt": this.state.endTime,
                    "clockedTime": this.state.clockedTime,
                    "isBillable": this.state.isBillable,
                    "createdBy": this.state.createdBy
                }
               this.props.addTask(payLoad);
            }, 500);
        }
    }

    render() {
        const { tasks, projects } = this.props;
        const { clockedTime, errors } = this.state;
        return (
            <div className="main-wrapper">
                <Container>
                <div className="head-wrapper">
                    <div className="field-wrapper">
                        <TextField label="Description" name="description" onChange={(e) => this.handleChange(e)} style={{ marginRight: '1rem' }} />
                        {errors.description !== '' && (
                        <span className="error">
                            {errors.description}
                        </span>)}
                    </div>
                    
                    <FormControl className="select-wrapper">
                        <InputLabel id="demo-simple-select-label">Project</InputLabel>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select" name="project" onChange={(e) => this.handleChange(e)}>
                        {
                            projects && projects.length ? projects.map((project, index) => {
                                return <MenuItem key={index} value={project.id}>{project.name}</MenuItem>
                            }) : null
                        }
                        </Select>
                        {errors.project !== '' && (
                        <span className="error">
                            {errors.project}
                        </span>)}
                    </FormControl>
                    <FormControlLabel
                        control={
                        <Checkbox
                            // checked={isBillable}
                            onChange={(e) => this.handleChange(e)}
                            name="isBillable"
                            color="primary"
                        />
                        }
                        label="Billable"
                    />
                    <p>{this.formatTime(clockedTime)}</p>
                    <Button color="primary" onClick={ () => this.handleSubmit()}>{this.state.istracking ? 'Stop' : 'Start'}</Button>
                </div>
                </Container>
            
            {/* <div style={{ height: 800, width: '80%', top: '200px' }}>
                <DataGrid rows={rows} columns={this.columns} pageSize={20} checkboxSelection />
            </div> */}
            
                <TableContainer className="table-container" component={Paper}>  
                    <Table stickyHeader  aria-label="sticky table">  
                        <TableHead>
                            <TableRow>  
                            <TableCell align="left">Description</TableCell>  
                            <TableCell align="left">Project</TableCell>  
                            <TableCell align="left">Start Time</TableCell>  
                            <TableCell align="left">End Time</TableCell>  
                            <TableCell align="left">Clocked Time</TableCell>  
                            <TableCell align="left">Billable</TableCell>  
                            <TableCell align="left" ></TableCell>  
                            </TableRow>  
                        </TableHead>
                        <TableBody>  
                            { tasks && tasks.length ? 
                                tasks.map((task, index) => {  
                                return <TableRow key={index}>  
                                            <TableCell component="th" scope="row">{task.description}</TableCell>  
                                            <TableCell align="left">{task.Project ? task.Project.name : ''}{(task.Project && task.Project.client) ? ' - '+task.Project.client: ''}</TableCell>  
                                            <TableCell align="left">{moment(task.startedAt).format('lll')}</TableCell>  
                                            <TableCell align="left">{moment(task.completedAt).format('lll')}</TableCell>  
                                            <TableCell align="left">{this.formatTime(task.clockedTime)}</TableCell>
                                            <TableCell align="left">{task.isBillable ? 'Y' : 'N'}</TableCell>  
                                            <TableCell align="left"><IconButton aria-label="delete" onClick={ () => this.handleDelete(task.id) }><DeleteIcon /></IconButton></TableCell>  
                                        </TableRow>  
                            })  : null
                            }  
                        </TableBody>  
                    </Table>  
                </TableContainer> 

            </div>
            
        )
    }
}

export default getConnect(User);