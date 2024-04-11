import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import { TableSortLabel } from '@material-ui/core';
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
import Select from "@material-ui/core/Select";

import CreateBidStatus from './CreateBidStatus.js';

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
    // width: 500,
    height: 50
  },
  button: {
    height: 60
  }
}));
function BidStatus({ bidstatus,status, statusAdded,
    getStatusById,
    statusUpdateCheck,
  StatusId}, filterFn) {
  const countData = status && status.length > 0 ? status[0].totalRecords : 0;
  const records = status && status.length > 0 ? status[0].data : 0;
  const [statusData, setStatusData] = useState();
  const [createCheck, setCreateCheck] = useState(false);
  const pageCount = Math.ceil(countData / 10);
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [modelOpen, setModelOpen] = useState(false);
  const [clickStatus, setclickStatus] = useState();
  const [order, setOrder] = useState('desc')
  const [id, setParamId] = useState('')

  const [orderBy, setOrderBy] = useState('createdAt')
  const [search, setSearch] = useState({
    status: '',
    sortColumn:order,
    orderBy:orderBy
  });


  useEffect(() => {
    setStatusData(StatusId && StatusId.length > 0 ? StatusId :'')
  },[StatusId])

  useEffect(() => {
    if (statusAdded || statusUpdateCheck) {
      setModelOpen(false);
      bidstatus(offset, limit, search);
    }
  }, [statusAdded, bidstatus,statusUpdateCheck])

  useEffect(() => {
    bidstatus(offset, limit, search);
  }, [bidstatus]);

  const createStatus = () => {
    setCreateCheck(true);
    setModelOpen(true);
  };

  const editStatus = (i) => {
    setCreateCheck(false)
    setParamId(i)
    getStatusById(i);
    setModelOpen(true);
  };


  const handleNameChange = (event) => {
    setSearch({
       status: event.target.value,
      sortColumn:search.sortColumn,
      orderBy:search.orderBy
    });
  };
  
  const handleChange = (event, value) => {
    setPage(value);
    let offsetValue = (value - 1) * limit;
    setOffset(offsetValue);
    bidstatus(offsetValue, limit, search);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = () => {
    setOffset(0);
    setPage(1);
    bidstatus(0, limit, search)
  };



  const handleSortRequest = cellId => {
    const isAsc = orderBy === cellId && order === "asc";
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(cellId);
    setSearch({
      status: search.status,
      sortColumn:isAsc ? 'desc' : 'asc',
      orderBy:cellId
    });
    sortData();
  }

  const sortData = () =>{
    setOffset(0);
    setPage(1);
    bidstatus(0, limit, search);
  }
  const headCells = [
    { id: '#', label: '#', disableSorting: true },
    { id: 'status', label: 'status' },
    { id: 'Actions', label: 'Actions', disableSorting: true },
  ]
  function stableSort(array, comparator) {
    return array ;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const recordsAfterPagingAndSorting = () => {
      return stableSort(records, getComparator(order, orderBy))
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3} justify="flex-end">
        <Grid item xs={9} md={10} lg={10}>
          <Title>Status</Title>
        </Grid>
        <Grid item xs={3} md={2} lg={2}>
          <button onClick={createStatus} className="btn btn-primary">
            Create Status
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
             <Grid container spacing={3}>
        <Grid item xs={4} md={4} lg={4}>
              <TextField
              fullWidth
                id="name"
                label="Search"
                onKeyPress={handleKeyPress}
                onChange={handleNameChange}
                variant="outlined"
                InputProps={{
                  className: classes.searchbar
                }}
              />
          </Grid>
          <Grid item xs={4} md={2} lg={2}>

            <button
              onClick={handleSearch}
              style={{ marginLeft: "10px",padding: '18px 32px' }}
              type="button"
              className="btn btn-primary"
              InputProps={{
                className: classes.button
              }}
            >
              Search
            </button>
            </Grid>
         </Grid>
          </form>
        </Grid>
        <Grid item xs={6} md={12} lg={12} >
          <Table>
            <TableHead>
              <TableRow>
                {
                  headCells.map(headCell => (
                    <TableCell key={headCell.id}
                      sortDirection={orderBy === headCell.id ? order : false}>
                      {headCell.disableSorting ? headCell.label :
                        <TableSortLabel
                          order={order}
                          orderBy={orderBy}
                          active={orderBy === headCell.id}
                          direction={orderBy === headCell.id ? order : 'asc'}
                          onClick={() => { handleSortRequest(headCell.id) }}>
                          {headCell.label}
                        </TableSortLabel>
                      }
                    </TableCell>))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {records && records.length
                ? recordsAfterPagingAndSorting().map((row, id) => (
                  <TableRow key={row.id}>

                    <TableCell>{id + 1}</TableCell>
                    <TableCell>{row.status}</TableCell>                    
                    <TableCell align="left">
                      <IconButton
                        aria-label="edit"
                        onClick={(e) => editStatus(row.id)}
                      >
                        <CreateIcon />
                      </IconButton>

                    </TableCell>

                  </TableRow>
                ))
                : <TableRow align="center">
                      Data Not Found

              </TableRow>}
            </TableBody>
          </Table>
          <div className={classes.paginate}>
            <Pagination
              count={pageCount > 1 ? pageCount : 1}
              // page={countData}
              onChange={handleChange}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
            />
          </div>
        </Grid>
      </Grid>
      {modelOpen && (
        <CreateBidStatus
          open={modelOpen}
          handleClose={() => setModelOpen(false)}
          StatusId={statusData}
          createCheck={createCheck}
        />
      )}
    </Container>
  );
}
export default getConnect(BidStatus);




