import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import getConnect from '../Common/connect';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MultiSelect } from "react-multi-select-component"; 
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



function CreateUser({addUser,userAdded, userActionPerformed,getRoles,roles }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState([]);
  const [submit, setSubmit ] = useState(false);

  useEffect(() => {
    getRoles();
  }, [getRoles])

  useEffect(() => {
    if(userAdded) {
      navigate("/users");
    }
  }, [userAdded])
  const handleSubmit = () => {
    if(email && password && firstName && type.length > 0) {
      addUser({ email, password, firstName, lastName, userGroupId:type.map(groupId => ({id: groupId})) })
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create User
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name"
                onChange={e => setFirstName(e.target.value)}
                value={firstName}
                autoFocus
                error={submit && !firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={e => setLastName(e.target.value)}
                value={lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={e => setEmail(e.target.value)}
                value={email}
                error={submit && !email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                error={submit && !password}
              />
            </Grid>
            <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                <InputLabel id="type-user">Type</InputLabel>
                <Select
                  required
                  labelId="type-user"
                  id="typeUserId"
                  value={type}
                  fullWidth
                  onChange={e => setType(e.target.value)}
                  label="Type"
                  error={submit && !type}
                  multiple
                >
                <MenuItem value="-1">
                <em>None</em>
              </MenuItem>
              {roles && roles.length ? roles.map((row, id) => (
                <MenuItem key={row.id} value={row.id}>{row.userGroup}</MenuItem>
              )) : null}
             
            </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Create User
          </Button>
        </form>
      </div>
    </Container>
  );
}
export default  getConnect(CreateUser);