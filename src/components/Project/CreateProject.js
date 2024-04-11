import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useNavigate } from 'react-router-dom';
import getConnect from '../Common/connect';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { formatDate } from '../../config/helper';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(2, 0, 0),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  typo: {
    marginBottom: theme.spacing(2),
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));
const steps = ['Project details', 'Users', 'Review Project'];

function CreateProject({ addProject, projectAdded, users: allUsers, getUsers }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [clients, setClients] = useState([]);
  const [filterClients, setFilterClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [teamLeads, setTeamLeads] = useState([]);
  const [filterTeamLeads, setFilterTeamLeads] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [activeStep, setActiveStep] = React.useState(0);

  const [submit, setSubmit] = useState(false);
  const getName = (option, withUsername) => `${option.firstName ? option.firstName : ''} ${option.lastName ? option.lastName : ''}${withUsername ? '(' + option.username + ')' : ''}`
  useEffect(() => {
    if (projectAdded) {
      navigate("/projects");
    }
  }, [projectAdded])
  useEffect(() => {
    getUsers();
  }, [getUsers])
  useEffect(() => {
    if (allUsers && allUsers.length) {
      let filteredUsers = [], filteredClients = [], filteredTeamLeads = [];
      const users = allUsers[0].data;
      users.forEach(user => {
        if (user.userGroupId === 1) {
          filteredClients.push(user)
        } else if ((user.userGroupId === 3) || (user.userGroupId === 2)) {
          filteredUsers.push(user)
        }
        if (user.userGroupId === 3) {
          filteredTeamLeads.push(user)
        }
      })
      setFilterClients(filteredClients);
      setFilterUsers(filteredUsers);
      setFilterTeamLeads(filteredTeamLeads);
    }
  }, [allUsers])

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = () => {
    setSubmit(true)
    if (activeStep === 0 && !name) {
      return
    } else {
      if (activeStep === steps.length - 1) {
        const payload = { name, startDate, endDate, description };
        if (clients && clients.length) {
          payload['clients'] = clients.map(client => client._id);
        }

        if (users && users.length) {
          payload['users'] = users.map(user => user.id);
          payload['team_leads'] = teamLeads.map(user => user.id);
        }

        addProject(payload)
      } else {
        setActiveStep(activeStep + 1);
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Create Project
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            <form className={classes.form} noValidate>
              <React.Fragment>
                {activeStep === 0 ? <React.Fragment>
                  <Typography className={classes.typo} component="h6" variant="h5" gutterBottom>
                    Project details
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        name="name"
                        variant="outlined"
                        fullWidth
                        id="name"
                        label="Name"
                        onChange={e => setName(e.target.value)}
                        value={name}
                        autoFocus
                        error={submit && !name}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="description"
                        label="Description"
                        name="description"
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <KeyboardDatePicker
                        inputVariant='outlined'
                        fullWidth
                        margin="normal"
                        id="startDate"
                        label="Start Date"
                        format="DD/MM/yyyy"
                        value={startDate}
                        onChange={setStartDate}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <KeyboardDatePicker
                        inputVariant='outlined'
                        fullWidth
                        margin="normal"
                        id="endDate"
                        label="End Date"
                        format="DD/MM/yyyy"
                        value={endDate}
                        required
                        onChange={setEndDate}
                      />
                    </Grid>
                  </Grid> </React.Fragment> : activeStep === 1 ? <React.Fragment>
                    <Typography className={classes.typo} component="h6" variant="h5" gutterBottom>
                      Users
                  </Typography>
                    <Grid container spacing={3}>
                      {/* <Grid item xs={12} sm={12}>
                        <Autocomplete
                          multiple
                          id="clients"
                          name="clients"
                          options={filterClients}
                          getOptionLabel={(option) => getName(option, true)}
                          value={clients}
                          onChange={(e, n) => setClients(n)}
                          filterSelectedOptions
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Clients"
                              placeholder="Search Clients"
                            />
                          )}
                        />
                      </Grid> */}
                      <Grid item xs={12} sm={12}>
                        <Autocomplete
                          multiple
                          id="users"
                          name="users"
                          options={filterUsers}
                          getOptionLabel={(option) => getName(option, false)}
                          value={users}
                          onChange={(e, n) => setUsers(n)}
                          filterSelectedOptions
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Users"
                              placeholder="Search Users"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <Autocomplete
                          multiple
                          id="teamLeads"
                          name="teamLeads"
                          options={filterTeamLeads}
                          getOptionLabel={(option) => getName(option, false)}
                          value={teamLeads}
                          onChange={(e, n) => setTeamLeads(n)}
                          filterSelectedOptions
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Team Leads"
                              placeholder="Search Team Leads"
                            />
                            
                          )}
                        />
                      </Grid>
                    </Grid></React.Fragment> : activeStep === 2 ? <React.Fragment>
                      <Typography variant="h6" gutterBottom>
                        Project
                      </Typography>
                      <List disablePadding>
                        <ListItem className={classes.listItem}>
                          <ListItemText primary={name} secondary={description} />
                        </ListItem>
                        <ListItem className={classes.listItem}>
                          <ListItemText primary="Start date" />
                          <Typography variant="subtitle1" className={classes.total}>
                            {formatDate(startDate)}
                          </Typography>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                          <ListItemText primary="End date" />
                          <Typography variant="subtitle1" className={classes.total}>
                            {formatDate(endDate)}
                          </Typography>
                        </ListItem>
                      </List>
                      <Grid container spacing={2}>
                        {/* {clients && clients.length ? <Grid item xs={12} sm={6}>
                          <Typography variant="h6" gutterBottom className={classes.title}>
                            Clients
                          </Typography>
                          <List disablePadding>
                            {clients.map(client => <ListItem className={classes.listItem}>
                              <ListItemText primary={client.username} secondary={getName(client)} />
                            </ListItem>)}
                          </List>
                        </Grid> : null} */}
                        {users && users.length ? <Grid item xs={12} sm={6}>
                          <Typography variant="h6" gutterBottom className={classes.title}>
                            Users
                          </Typography>
                          <List disablePadding>
                            {users.map(user => <ListItem className={classes.listItem}>
                              <ListItemText primary={user.username} secondary={getName(user)} />
                            </ListItem>)}
                          </List>
                        </Grid> : null}
                        {teamLeads && teamLeads.length ? <Grid item xs={12} sm={6}>
                          <Typography variant="h6" gutterBottom className={classes.title}>
                            Team Leads
                          </Typography>
                          <List disablePadding>
                            {teamLeads.map(user => <ListItem className={classes.listItem}>
                              <ListItemText primary={user.username} secondary={getName(user)} />
                            </ListItem>)}
                          </List>
                        </Grid> : null}
                      </Grid>
                    </React.Fragment> : null}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={activeStep === 0 && !name}
                    onClick={handleSubmit}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Create Project' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            </form>
          </React.Fragment>
        </Paper>
      </main>
    </Container>
  );
}
export default getConnect(CreateProject);
