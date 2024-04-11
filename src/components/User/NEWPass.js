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
import copy from "copy-to-clipboard";  
import { useNavigate } from 'react-router-dom';
var generator = require('generate-password');


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



function NewPassword({getUser, user,getRoles,props,copyCredentials,editUser}) {
    // const id = history.location.state.id;
    const classes = useStyles();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [type, setType] = useState('-1');
    const [submit, setSubmit] = useState(false);
    const [password, setPassword] = useState('');
    // useEffect(() => {

    //     getUser(id);

    // }, [getUser, id])

    useEffect(() => {
        getRoles();
      }, [getRoles])

    useEffect(() => {
        if(user){
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setType(user.role?user.role.id:'-1');
            setSubmit(false);
        }

    }, [user])

    useEffect(() => {
        if (editUser) {
            navigate("/users");
        }
    }, [editUse])
    const handleSubmit = () => {
        setSubmit(props.submit)
            copyCredentials(user.id,{ email,password });
         copyToClipboard();
    }
    const handleCopyEmail = (e) => {
        setEmail(e.target.value)
     } 
    
     const handleCopyPassword = (e) => {
      setPassword(e.target.value)
    } 
    
     const copyToClipboard = () => {
       var credentials = "username:" + email + "/password:" + password
      copy(credentials);
      alert(`You have copied "${credentials}"`);
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Edit User
        </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                onChange={handleCopyEmail}
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
                type="Password"
                id="password"
                autoComplete="current-password"
                onChange={handleCopyPassword}
                value={password}
                error={submit && !password}
              />
            </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                         Save
          </Button>
                </form>
            </div>
        </Container>
    );
}
export default getConnect(NewPassword);