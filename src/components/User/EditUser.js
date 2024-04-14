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
import { useNavigate, useLocation } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';

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



function DisplayUser({ history, addUser, userActionPerformed, getUser, user,updateUser ,getRoles,roles,editUser}) {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [type, setType] = useState([]);
    const [submit, setSubmit] = useState(false);
    const [checked, setChecked] = useState({checked: false });
    const id = location.state ? location.state.id : null;
    
    const handleToggle = (event) => {
        setChecked({ ...checked, [event.target.name]: event.target.checked });
      };

    useEffect(() => {
        getUser(id);
    }, [])
    useEffect(() => {
        getRoles();
      }, [getRoles])

    useEffect(() => {
        if(user){
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            if (user && Array.isArray(user.userId)) {
                setType(user && user.userId ? user.userId.map(group => group.userGroupId ) : []); 
            }
            
            setSubmit(false);
            if(user.active){
                setChecked({checked: true })
            }
            else{
                setChecked({checked: false })
            }
        }
    }, [user])

    

    useEffect(() => {
        if (editUser) {
            navigate("/users");
        }
    }, [editUser])
    const handleSubmit = () => {
        setSubmit(true)
        if (email && firstName && type ) {
            if(checked.checked ==false){
            updateUser(id,{ email, firstName, lastName, userGroupId: type.map(groupId => ({id: groupId})),active:false });
        }
        else {
            updateUser(id,{ email, firstName, lastName, userGroupId: type.map(groupId => ({id: groupId})),active:true}) 
        }
    }
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
                        <Grid item xs={12}>
                        <InputLabel id="type-user">Enable user</InputLabel>

                            <FormControl fullWidth className={classes.formControl}>
                                {/* <Switch
                                    edge="end"
                                    onChange={handleToggle('a')}
                                    checked={checked.indexOf('a') !== -1}                    
                                /> */}
                                <Switch
                                    checked={checked.checked}
                                    onChange={handleToggle}
                                    name="checked"
                                />
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
                         Save
          </Button>
                </form>
            </div>
        </Container>
    );
}
export default getConnect(DisplayUser);