import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from "@material-ui/icons/Delete";
import { FileCopy } from '@material-ui/icons';
import { Title } from '../Common';
import getConnect from '../Common/connect';
import { IconButton } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { formatDate } from '../../config/helper';
import Pagination from '@material-ui/lab/Pagination';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import copy from "copy-to-clipboard";
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
var generator = require('generate-password');


const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  paginate: {
    padding: '1rem',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  enable:{
    color: "black", 
    fontWeight: "bold"
  },
  disable:{
    color: "red", 
    fontWeight: "bold"
  }
}));
function Users({getUsers, users, deleteUser, getRoles, roles, getUser, user, resetUserPassword, editUser }) {
  const countData = users.length > 0 ? users[0].totalRecords : 0;
  const pageCount = Math.ceil(countData / 10);
  const classes = useStyles();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState({
    name: '',
    email: '',
    role: ''
  });
  const [id, setParamId] = useState('')
  const [resetUserCredential, setResetUserCredential] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(generator.generate({
    length: 10,
    numbers: true
  }));
  
  useEffect(() => {
    getUsers(offset, limit, search);
    getRoles();
  }, [getUsers, getRoles])


  useEffect(() => {
    if (editUser) {
      setEmail("")
    }
  }, [editUser])

  const createUser = () => {
    navigate("/users/create");
  }
  const editUsers = (id) => {
    navigate("/users/edit",  {state: { id: id } });
  }

  useEffect(()=>{
    if(Object.entries(user).length > 0){
    setEmail(user.email)
    }
  },[user])

  const prepareCredential = async (id) => {
    setParamId(id)
    await getUser(id)
    setResetUserCredential(true)
  }

  useEffect(() => {
    if (email && resetUserCredential) {
      resetUserPassword(user.id, { password });
      var credentials = "username:" + email + "/password:" + password;
      copy(credentials);
      setResetUserCredential(false);
    }
  }, [email, resetUserCredential]);

  const handelDelete = (id) => {
    deleteUser(id);
  }

  const handleChange = (event, value) => {
    setPage(value);
    let offsetValue = (value - 1) * limit;
    setOffset(offsetValue);
    getUsers(offsetValue, limit, search);
  };

  const handleRoleChange = (event) => {
    setSearch({
      name: search.name,
      email: search.email,
      role: event.target.value
    })
  };

  const handleNameChange = (event) => {
    setSearch({
      name: event.target.value,
      email: event.target.value,
      role: search.role
    })
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(event);
    }
  }

  const handleSearch = () => {
    setOffset(0)
    setPage(1)
    getUsers(0, limit, search);
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3} justify='flex-end'>
        <Grid item xs={9} md={10} lg={10}>
          <Title>Users</Title>
        </Grid>
        <Grid item xs={3} md={2} lg={2}>
          <button onClick={createUser} className='btn btn-primary'>
            Create User
          </button>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="name" label="Search" onKeyPress={handleKeyPress} onChange={handleNameChange} variant="outlined" />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                value={search.role}
                onChange={handleRoleChange}
                label="Role"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {roles && roles.length ? roles.map((row, id) => (
                  <MenuItem key={row.id} value={row.id}>{row.role}</MenuItem>
                )) : null}

              </Select>
            </FormControl>
            <button onClick={handleSearch} type="button" className='btn btn-primary'>
              Search
            </button>
          </form>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Date Created</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users && users.length ? users[0].data.map((row, index) => (
                <TableRow className={row.active == 1 ? classes.enable : classes.disable } key={row.id}>
   
                  <TableCell className={row.active == 1 ? classes.enable : classes.disable }>{index + 1}</TableCell>
                  <TableCell className={row.active == 1 ? classes.enable : classes.disable }>{row.firstName} {row.lastName}</TableCell>
                  <TableCell className={row.active == 1 ? classes.enable : classes.disable }>{row.email}</TableCell>
                  <TableCell className={row.active == 1 ? classes.enable : classes.disable }>{formatDate(row.createdAt)}</TableCell>
                  <TableCell className={row.active == 1 ? classes.enable : classes.disable }>{row.userId[0].userGroup.userGroup}</TableCell>
                  <TableCell align="left" className={row.active == 1 ? classes.enable : classes.disable }>
                    <IconButton className={row.active == 1 ? classes.enable : classes.disable } aria-label="edit" onClick={e => prepareCredential(row.id)}><FileCopy /></IconButton>
                    <IconButton className={row.active == 1 ? classes.enable : classes.disable } aria-label="edit" onClick={e => editUsers(row.id)}><CreateIcon /></IconButton>
                    <IconButton className={row.active == 1 ? classes.enable : classes.disable } aria-label="edit" onClick={e => handelDelete(row.id)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              )) : null}
            </TableBody>
          </Table>
          <div className={classes.paginate}>
            <Pagination count={pageCount > 1 ? pageCount : 1} page={countData} onChange={handleChange} siblingCount={1} boundaryCount={1} variant="outlined" />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
export default getConnect(Users);