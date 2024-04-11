import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Title } from "../Common";
import getConnect from "../Common/connect";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { formatDate } from "../../config/helper";
import { IconButton } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import FormControl from "@material-ui/core/FormControl";
import Pagination from "@material-ui/lab/Pagination";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TablePagination from '@material-ui/core/TablePagination';
import { ReactComponent as BulkEdit } from '../../icons/bulk-edit.svg';
import { Close } from '@material-ui/icons';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CreateClient from './addClient';
import { Link } from 'react-router-dom';


import StatusModel from './stausModel.js';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  paginate: {
    padding: "1rem",
    display: "flex",
    justifyContent: "flex-end",
  },
  searchbar: {
    width: 500,
    height: 50
  },
  button: {
    height: 60
  }
}));
function Clients({ getclients, clients, clientAdded,
  getClientById, clientsUpdateCheck }) {
  const countData = clients && clients.length > 0 ? clients[0].totalRecords : 0;
  const pageCount = Math.ceil(countData / 10);
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [bidType, setBidStatusType] = useState("");
  const [search, setSearch] = useState({
    name: ""
  });
  const [modelOpen, setModelOpen] = useState(false);
  const [clickStatus, setclickStatus] = useState();
  const [id, setParamId] = useState('')
  const [createCheck, setCreateCheck] = useState(false);



  useEffect(() => {
    getclients(offset, limit, search);

  }, [getclients]);


  useEffect(() => {
    if (clientAdded || clientsUpdateCheck) {
      setModelOpen(false);
      getclients(offset, limit, search);
    }
  }, [clientAdded, getclients, clientsUpdateCheck])

  const editClient = (id) => {
    setCreateCheck(false)
    setParamId(id)
    getClientById(id);
    setModelOpen(true);
  };
  

  const handleNameChange = (event) => {
    setSearch({
      name: event.target.value,
      //   email: event.target.value,
    });
  };
  const handleChange = (event, value) => {
    setPage(value);
    let offsetValue = (value - 1) * limit;
    setOffset(offsetValue);
    getclients(offset, limit, search);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const handleClick = () => {
    setCreateCheck(true);
    setModelOpen(true);

  }

  const handleSearch = () => {
    setOffset(0);
    setPage(1);
    getclients(0, limit, search);

  };

    if(clients && clients.length>0 && clients[0].data){ 
   let clientsData= clients[0].data;
    let clientsHiringData = clients[0].datavalue;
    
     clients[0].data = clientsData.map(clientData => {
        let clientFromClientDetail = clientsHiringData.find(clientHiringData => clientHiringData.ClientDetail.id == clientData.id);
        if (clientFromClientDetail) {
            clientData.userProposal = clientFromClientDetail.userProposal;
        } else {
            clientData.userProposal = 0;
        }
        return clientData;
    })
  }
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3} justify="flex-end">
        <Grid item xs={9} md={10} lg={10}>
          <Title>Clients</Title>
        </Grid>
        <Grid item xs={3} md={2} lg={2}>
          <button onClick={handleClick} className="btn btn-primary">
            Create Clients
          </button>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <TextField
              id="name"
              label="Search"
              onKeyPress={handleKeyPress}
              onChange={handleNameChange}
              variant="outlined"
              InputProps={{
                className: classes.searchbar
              }}
            />
            <button
              onClick={handleSearch}
              style={{ marginLeft: "10px" }}
              type="button"
              className="btn btn-primary"
              InputProps={{
                className: classes.button
              }}
            >
              Search
            </button>
          </form>
        </Grid>
        <Grid item xs={6} md={12} lg={12} >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Timezone</TableCell>
                <TableCell>CreatedBy/ModifiedBy</TableCell>
                <TableCell>Hired</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
              {clients && clients.length > 0 && clients[0].data && clients[0].datavalue
                ? clients[0].data.map((row, id) => (
                  <TableRow key={row.id}>
                    <TableCell>{id + 1}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.timezone}</TableCell>
                    <TableCell> {row.createdUser && `${row.createdUser.firstName}`}
  {row.createdUser && row.createdUser.lastName && ` ${row.createdUser.lastName}`}
  {row.updatedUser && row.updatedUser.firstName && ' / '}
  {row.updatedUser && `${row.updatedUser.firstName}`}
  {row.updatedUser && row.updatedUser.lastName && ` ${row.updatedUser.lastName}`}
                    </TableCell>
                       
                    <TableCell >
                      <Link to= {{ pathname: '/proposals', search:
                      `?s=%7B%22name%22%3A%22%22%2C%22description%22%3A%22%22%2C%22channels%22%3A%22%22%2C%22status%22%3A5%2C%22sortColumn%22%3A%22desc%22%2C%22orderBy%22%3A%22proposalDate%22%2C%22client%22%3A${row.id}%7D`,
                            }}>
                      { row.userProposal 
                          } </Link> </TableCell>
                    <TableCell align="left">
                      <IconButton
                        aria-label="edit"
                        onClick={(e) => editClient(row.id)}
                      >
                        <CreateIcon />
                      </IconButton>
                    </TableCell>

                  </TableRow>
                ))
                : null}
            </TableBody>
          </Table>
          <div className={classes.paginate}>
            <Pagination
              count={pageCount > 1 ? pageCount : 1}
              // page={countData}
              onChange={handleChange}
              defaultPage={1}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
            />
          </div>
        </Grid>
      </Grid>
      {modelOpen && (
        <CreateClient
          open={modelOpen}
          handleClose={() => setModelOpen(false)}
          clickStatus={clickStatus}
          createCheck={createCheck}
        />
      )}
    </Container>
  );
}
export default getConnect(Clients);
