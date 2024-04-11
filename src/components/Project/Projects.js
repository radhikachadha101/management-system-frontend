import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Navigate } from 'react-router-dom';
import { Title } from '../Common';
import getConnect from '../Common/connect';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { formatDate } from '../../config/helper';
import { IconButton  } from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from "@material-ui/icons/Delete"
import FormControl from '@material-ui/core/FormControl';

import Pagination from '@material-ui/lab/Pagination';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

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
}));
function Projects({ projects, getProjects,deleteProject}) {
  const countData = projects.length > 0 ? projects[0].totalRecords: 0 ;
  const pageCount = Math.ceil(countData/10);
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState({
    name: '',
    description: '',
  });

  useEffect(() => { 
    getProjects(offset, limit, search);
  }, [getProjects])
  const createProject = () => {
    return <Navigate to="/projects/create" />;
  }
  const editProject  = (id) => {
    navigator("/projects/edit", {state: { id: id } });
}
const handleNameChange = (event) => {
  setSearch({
    name: event.target.value,
    description: event.target.value,
  })
};
const handleChange = (event, value) => {
  setPage(value);
  let offsetValue = (value-1) * limit;
  setOffset(offsetValue) ;
  getProjects(offsetValue, limit, search);
    
};

const handleKeyPress = (event) => {
  if(event.key === 'Enter'){
    handleSearch();
  }
}

const handleSearch = () => {
  setOffset(0)
  setPage(1)
  getProjects(0, limit, search);
};


const handelDelete  = (id) => {
  deleteProject(id)
}
  return (
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3} justify='flex-end'>
        <Grid item xs={9} md={10} lg={10}>
          <Title>Projects</Title>
        </Grid>
        <Grid item xs={3} md={2} lg={2}>
          <button onClick={createProject} className='btn btn-primary'>
          Create Project
          </button>
        </Grid>
        <Grid item xs={12} md={12} lg={12} >
        <form className={classes.root} noValidate autoComplete="off" onSubmit={e => { e.preventDefault(); }} >
          <TextField id="name" label="Search" onKeyPress={handleKeyPress} onChange={handleNameChange} variant="outlined" />
          <button onClick={handleSearch} style={{marginLeft: '10px'}} type="button" className='btn btn-primary'>
          Search
          </button>
        </form>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              {/* <TableCell>Clients</TableCell>
              <TableCell>Users</TableCell> */}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { projects && projects.length ? projects[0].data.map((row, id) => (
              <TableRow key={row.id}>
                <TableCell>{id+1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{formatDate(row.startDate)}</TableCell>
                <TableCell>{formatDate(row.endDate)}</TableCell>
                {/* <TableCell></TableCell>
                <TableCell></TableCell> */}
                <TableCell align="left"><IconButton aria-label="edit" onClick={e => editProject(row.id)}><CreateIcon /></IconButton>
                <IconButton aria-label="edit" onClick={e => handelDelete(row.id)}><DeleteIcon /></IconButton></TableCell>  
              </TableRow>
            )) : null}
          </TableBody>
        </Table>
        <div className={classes.paginate}>
        <Pagination count={pageCount > 1 ? pageCount: 1 } page={countData} onChange={handleChange} siblingCount={1} boundaryCount={1}  variant="outlined" />
      </div>
        </Grid>
      </Grid>
    </Container>
  );
}
export default getConnect(Projects);