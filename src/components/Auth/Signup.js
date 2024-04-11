import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import getConnect from '../Common/connect';
import { Link } from 'react-router-dom';
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

function SignUp({ register, signUp, isLoggedIn }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submit, setSubmit ] = useState(false);
  useEffect(() => {
    if(signUp) {
      navigate("/");
    }
    if(isLoggedIn) {
      navigate("/home");
    }
  }, [signUp, isLoggedIn])
  const handleSubmit = (e) => {
	e.preventDefault();
    setSubmit(true)
    if(email && password && firstName) {
      register({ email, password, firstName, lastName })
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
          </Grid>
          <Button
		  	type='submit'
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>                               
    </Container>
  );
}

export default  getConnect(SignUp);