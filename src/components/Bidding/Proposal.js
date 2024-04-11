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
import AssignmentIcon from '@material-ui/icons/Assignment';
import Select from "@material-ui/core/Select";
import { Link } from 'react-router-dom';
import StatusModel from './stausModel.js';
import useStateWithUrlParams from 'react-use-state-url-params';
import CommentIcon from '@material-ui/icons/Comment';
import Tooltip from "@material-ui/core/Tooltip";
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import store from '../../config/store';
import { decode } from 'jsonwebtoken'

const moment = extendMoment(originalMoment);

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
  },
  overFlow: {
    marginTop: 100,
    display: "block",
    paddingBottom: 100,
    width: 200,
    overflow: "hidden",
    textOverflow: 'ellipsis'
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3)
  }
}));
function Proposal({ proposals, getProposals, bidStatus, proposalUpdate,
  getBidStatus,
  getChannels,
  channels,
  getSkills,
  skills,
  getBidProfiles,
  profile,
  profiles,
  getPrpoposalById,
  getclients,
  clients,
  getUsers,
  users,
  props
}, filterFn) {
  const countData = proposals && proposals.length > 0 ? proposals[0].totalRecords : 0;
  const records = proposals && proposals.length > 0 ? proposals[0].data : 0;
  const pageCount = Math.ceil(countData / 10);
  const classes = useStyles();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [id, setId] = ("")
  const [modelOpen, setModelOpen] = useState(false);
  const [clickStatus, setclickStatus] = useState();
  const [order, setOrder] = useState('desc')
  const [orderBy, setOrderBy] = useState('proposalDate')
  const [search, setSearch] = useStateWithUrlParams({
    name: '',
    description: '',
    channels: '',
    status: '',
    sortColumn: order,
    orderBy: orderBy,
    profile: '',
    client: '',
    user: '',
    startDate: '',
    endDate: ''
  }, 's');


  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { AppReducer: { token: authToken } } = store.getState();
  const token = authToken || localStorage.getItem('authToken');
  let roles = "";
    if(token) {
      const { user : { userGroup } } = decode(token);
      if(userGroup) {
        roles = userGroup;
      }
    } 
 //if no token redirect to login page

  const handleChangeStatus = (row, id) => {
    setclickStatus(row)
    setModelOpen(true)
    getPrpoposalById(id);
  };


  const handleChangeChannel = (event) => {
    setSearch({
      name: search.name,
      description: search.description,
      channels: event.target.value,
      status: search.status,
      sortColumn: search.sortColumn,
      orderBy: search.orderBy,
      profile: search.profile,
      client: search.client,
      profile: search.profile,
      skill: search.skills
    })
  }
  const handelChangeStatus = (event) => {
    setSearch({
      name: search.name,
      description: search.description,
      channels: search.channels,
      status: event.target.value,
      sortColumn: search.sortColumn,
      orderBy: search.orderBy,
      profile: search.profile,
      client: search.client,
      profile: search.profile,
      skill: search.skills
    })
  }


  const startDateChange = (date) => {
    setStartDate(date)
    setSearch({
      name: search.name,
      description: search.description,
      channels: search.channels,
      status: search.value,
      sortColumn: search.sortColumn,
      orderBy: search.orderBy,
      profile: search.profile,
      client: search.client,
      profile: search.profile,
      skill: search.skills,
      startDate: date,
      endDate: search.endDate,
    })
  }


  const endDateChange = (date) => {
    setEndDate(date)
    setSearch({
      name: search.name,
      description: search.description,
      channels: search.channels,
      status: search.value,
      sortColumn: search.sortColumn,
      orderBy: search.orderBy,
      profile: search.profile,
      client: search.client,
      profile: search.profile,
      skill: search.skills,
      startDate: search.startDate,
      endDate: date,
    })
  }


  const handleChangeProfiles = (event) => {
    setSearch({
      name: search.name,
      description: search.description,
      channels: search.channels,
      status: search.status,
      sortColumn: search.sortColumn,
      orderBy: search.orderBy,
      profile: event.target.value,
      client: search.client,
    })
  }


  const handleFilterChange = (event) => {
    setSearch(prevSearch => {
      let newSearch = { ...prevSearch };
      newSearch[event.target.name] = event.target.value
      return newSearch;
      // profile:event.target.value,
      // skill:search.skills
    })
  }

  const handleChangeSkill = (event) => {
    setSearch({
      name: search.name,
      description: search.description,
      channels: search.channels,
      status: search.status,
      sortColumn: search.sortColumn,
      orderBy: search.orderBy,
      profile: search.profile,
      skill: event.target.value,
      client: search.client,
    })
  }


  const handleReset = (event) => {
    setSearch({
      name: '',
      description: '',
      channels: '',
      status: '',
      skill: '',
      sortColumn: order,
      orderBy: orderBy,
      client: ''
    });
    setOffset(0);
    setPage(1);
    getProposals(0, limit, search);
  };

  useEffect(() => {
    if (proposalUpdate) {
      setModelOpen(false);
      getProposals(offset, limit, search);
      navigate("/proposals");
    }
  }, [proposalUpdate, getProposals])

  useEffect(() => {
    getBidStatus();
    getProposals(offset, limit, search);
    getChannels();
    getSkills();
    getBidProfiles();
    getclients();
    getUsers();
  }, [getProposals, getBidStatus, getChannels, getBidProfiles, getclients, getSkills, getUsers]);

  const createProject = () => {
    navigate("/proposal/create");
  };
  const editProject = (id) => {
    navigate("/proposal/edit", {state: { id: id } });
  };

  const handleNameChange = (event) => {
    setSearch({
      name: event.target.value,
      description: event.target.value,
      channels: search.channels,
      status: search.status,
      skill: search.skills,
      sortColumn: search.sortColumn,
      orderBy: search.orderBy
    });
  };

  const handleChange = (event, value) => {
    setPage(value);
    let offsetValue = (value - 1) * limit;
    setOffset(offsetValue);
    getProposals(offsetValue, limit, search);
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
    getProposals(0, limit, search);
  };

  const SummaryData = (id) => {
    navigate("/proposal/Summary", {state: { id: id } });
  }

  const handleSortRequest = cellId => {
    const isAsc = orderBy === cellId && order === "asc";
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(cellId);
    setSearch({
      name: search.name,
      description: search.description,
      channels: search.channels,
      skill: search.skills,
      status: search.status,
      sortColumn: isAsc ? 'desc' : 'asc',
      orderBy: cellId
    });
    sortData();
  }

  const sortData = () => {
    setOffset(0);
    setPage(1);
    getProposals(0, limit, search);
  }
  const headCells = [
    { id: '#', label: '#', disableSorting: true },
    { id: 'name', label: 'Job title' },
    { id: 'jobUrl', label: 'Job Url' },
    { id: 'profileId', label: 'Profile Id' },
    { id: 'channelId', label: 'Channel' },
    { id: 'statusId', label: 'Status' },
    { id: 'rate', label: 'Rate' },
    { id: 'proposalDate', label: 'Proposal Date' },
    { id: 'createdBy', label: 'Created By' },
    { id: 'Actions', label: 'Actions', disableSorting: true },
  ]
  function stableSort(array, comparator) {
    return array;
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
          <Title>Proposals</Title>
        </Grid>
        <Grid item xs={3} md={2} lg={2}>
          <button onClick={createProject} className="btn btn-primary">
            Create Proposal
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
              <Grid item xs={4} md={3} lg={3}>

                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel id="type-user">Status</InputLabel>
                  <Select
                    fullWidth
                    required
                    labelId="type-user"
                    id="typeUserId"
                    value={search.status}
                    name='status'
                    onChange={handleFilterChange}
                    label="Type"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {bidStatus && bidStatus.length
                      ? bidStatus.map((row, id) => (
                        <MenuItem key={row.id} value={row.id}>
                          {row.status}
                        </MenuItem>
                      ))
                      : null}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4} md={3} lg={3}>

                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel id="type-user">Channel</InputLabel>
                  <Select
                    required
                    labelId="type-user"
                    id="typeUserId"
                    value={search.channels}
                    fullWidth
                    name='channels'
                    onChange={handleFilterChange}
                    label="Channel Type"

                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {channels && channels.length
                      ? channels.map((row, id) => (
                        <MenuItem key={row.id} value={row.id}>
                          {row.channel}
                        </MenuItem>
                      ))
                      : null}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={2} lg={2}>

                <button
                  onClick={handleSearch}
                  style={{ marginLeft: "10px", padding: '18px 32px' }}
                  type="button"
                  className="btn btn-primary"
                  InputProps={{
                    className: classes.button
                  }}
                >
                  Search
                </button>
              </Grid>

              <Grid item xs={4} md={3} lg={3}>

                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel id="type-user">Profiles</InputLabel>
                  <Select
                    required
                    labelId="type-user"
                    id="typeUserId"
                    value={search.profile}
                    fullWidth
                    name='profile'
                    onChange={handleFilterChange}
                    label="Profiles Type"

                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {profiles && profiles.length
                      ? profiles.map((row, id) => (
                        <MenuItem key={row.id} value={row.id}>
                          {row.name}
                        </MenuItem>
                      ))
                      : null}
                  </Select>

                </FormControl>
              </Grid>

              <Grid item xs={4} md={3} lg={3}>

                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel id="type-user">Team member</InputLabel>
                  <Select
                    required
                    labelId="type-user"
                    id="typeUserId"
                    value={search.user}
                    fullWidth
                    name='user'
                    onChange={handleFilterChange}
                    label="PUser"

                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {users && users.length
                      ? users[0].data.map((row, id) => (
                        <MenuItem key={row.id} value={row.id}>
                          {row.firstName}
                        </MenuItem>
                      ))
                      : null}
                  </Select>

                </FormControl>
              </Grid>

              <Grid item xs={4} md={3} lg={3}>

                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel id="type-user">Clients</InputLabel>
                  <Select
                    required
                    labelId="type-user"
                    id="typeUserId"
                    value={search.client}
                    fullWidth
                    name='client'
                    onChange={handleFilterChange}
                    label="Client Type"

                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {clients && clients.length
                      ? clients.map((row, id) => (
                        <MenuItem key={row.id} value={row.id}>
                          {row.name}
                        </MenuItem>
                      ))
                      : null}
                  </Select>

                </FormControl>
              </Grid>

              <Grid item xs={4} md={3} lg={3}>

                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel id="type-user">Skill</InputLabel>
                  <Select
                    required
                    labelId="type-user"
                    id="typeUserId"
                    value={search.skill}
                    name='skill'
                    fullWidth
                    onChange={handleFilterChange}
                    label="Profiles Type"

                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {skills && skills.length
                      ? skills.map((row, id) => (
                        <MenuItem key={row.id} value={row.id}>
                          {row.skill}
                        </MenuItem>
                      ))
                      : null}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4} md={3} lg={3}>
                <DatePicker
                  selected={startDate}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate} // add the endDate to your startDate DatePicker now that it is defined
                  onChange={startDateChange}
                />
                <DatePicker
                  selected={endDate}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  onChange={endDateChange}
                />
              </Grid>


              <Grid item xs={6} md={2} lg={2}>

                <button
                  onClick={handleReset}
                  style={{ marginLeft: "10px", padding: '18px 32px' }}
                  type="button"
                  className="btn btn-primary"
                  InputProps={{
                    className: classes.button
                  }}
                >
                  Reset
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
                    <TableCell>{row.name}</TableCell>
                    <TableCell className={classes.overFlow}>
                      <Link to={{ pathname: `${row.jobUrl}` }} target="_blank">{row.jobUrl}
                      </Link>
                    </TableCell>
                    <TableCell>{row.profile.email}</TableCell>
                    <TableCell>{row.channel.channel}</TableCell>
                    <TableCell>
                      {row.status.status == "Pending" ? <p style={{ color: "#E87722", fontWeight: "bold" }}>{row.status.status}</p> :
                        row.status.status == "Hired" ? <p style={{ color: "black", fontWeight: "bold", backgroundColor: '#008240', textAlign: 'center' }}>{row.status.status}</p> :
                          row.status.status == "Close" ? <p style={{ color: "black", fontWeight: "bold", backgroundColor: 'Red', textAlign: 'center' }}>{row.status.status}</p> : <p style={{ fontWeight: "bold" }}>{row.status.status}</p>}
                      {/* {row.status.status} */}
                      {row.statusId != 5 ?
                        <div style={{ marginTop: '10px' }}>
                          <button
                            onClick={() => handleChangeStatus(row, row.id)}
                            className="btn btn-primary btn-sm">
                            Change Status
                          </button>
                        </div>
                        : ''}
                    </TableCell>
                    <TableCell>{row.rate}</TableCell>
                    <TableCell>{formatDate(row.proposalDate)}</TableCell>
                    {/* <TableCell></TableCell> */}
                    <TableCell>{row.userInfo.firstName + ' ' + row.userInfo.lastName}</TableCell>
                    <TableCell align="left" style={{ 'display': 'flex', 'padding': '10px 0px 94px 0px' }}>
                      {(roles == 'BD TRAINEE' && row.status.status != "Hired") || roles == 'ADMIN' || roles == 'BD MANAGER' ?
                        <IconButton
                          aria-label="edit"
                          onClick={(e) => editProject(row.id)}
                        >
                          <CreateIcon />
                        </IconButton> : ""}
                      <IconButton
                        aria-label="edit"
                        onClick={(e) => SummaryData(row.id)}
                      >
                        <AssignmentIcon />
                      </IconButton>
                      <Tooltip title={row?.ProposalComments[0]?.comment ? row?.ProposalComments[0]?.comment : 'No comments Available'} aria-label="add">
                        <IconButton
                          aria-label="edit"
                        >
                          <CommentIcon /><sub><font style={{ fontSize: "15px", color: "red", fontWeight: "800" }}>{row?.ProposalComments ? row.ProposalComments.length : ""}</font></sub>
                        </IconButton>
                      </Tooltip>

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
              page={countData}
              onChange={handleChange}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
            />
          </div>
        </Grid>
      </Grid>
      {modelOpen && (
        <StatusModel
          open={modelOpen}
          handleClose={() => setModelOpen(false)}
          clickStatus={clickStatus}
          proposalUpdate={proposalUpdate}
          id={id}
        />
      )}
    </Container>
  );
}
export default getConnect(Proposal);