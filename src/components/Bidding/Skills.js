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
import { Navigate } from 'react-router-dom';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TablePagination from '@material-ui/core/TablePagination';
import { ReactComponent as BulkEdit } from '../../icons/bulk-edit.svg';
import { Close } from '@material-ui/icons';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AddSkill from './AddSkill';

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
function Skills({ proposals, getSkillsData, getBidStatus, bidStatus, proposalUpdate, skills,addskills,skillSubmit,
getSkillById, SkillUpdateCheck }) {
  const countData = skills && skills.length > 0 ? skills[0].totalRecords : 0;
  const pageCount = Math.ceil(countData/10);
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [bidType, setBidStatusType] = useState("");
  const [search, setSearch] = useState({
    name: "",
    description: "",
  });
  const [modelOpen, setModelOpen] = useState(false);
  const [clickStatus, setclickStatus] = useState();
  const [id, setParamId] = useState('')
  const [createCheck, setCreateCheck] = useState(false);



  const handleChangeStatus = (row) => {
    setclickStatus(row)
    setModelOpen(true);
  };

  useEffect(() => {
    setclickStatus(skills && skills.length > 0 ? skills :'')
  },[skills])

  useEffect(() => {
    if (SkillUpdateCheck || skillSubmit) {
      setModelOpen(false);
      getSkillsData(offset, limit, search);
    }
  }, [SkillUpdateCheck, skillSubmit])


  useEffect(() => {
    getSkillsData(offset, limit, search);

  }, [getSkillsData]); 


  const editProject = (id) => {
    // history.push({
    //   pathname: "/proposal/edit",
      // state: { id: id },
    // });
    setCreateCheck(false)
    setParamId(id)
    getSkillById(id);
    setModelOpen(true);
  };
  const createSkill = () => {
    return <Navigate to="/skilled" />;
  };


  const handleNameChange = (event) => {
    setSearch({
      name: event.target.value,
      description: event.target.value,
    });
  };
  const handleChange = (event, value) => {
    setPage(value);
    let offsetValue = (value - 1) * limit;
    setOffset(offsetValue);
    getSkillsData(offset, limit, search);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const handleClick = ()=>{
    setCreateCheck(true);
    setModelOpen(true);
    
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = () => {
    setOffset(0);
    setPage(1);
    getSkillsData(0, limit, search);

  };

  const submitSkill = (e) => {
    setModelOpen(false);
  };

  const SummaryData = (id) => {
    return <Navigate to={{ pathname: "/proposal/Summary", state: { id: id } }} />;
  }
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3} justify="flex-end">
        <Grid item xs={9} md={10} lg={10}>
          <Title>Skills</Title>
        </Grid>
        <Grid item xs={3} md={2} lg={2}>
          <button onClick={handleClick} className="btn btn-primary">
            Create Skills
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
                <TableCell>Skill</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {skills && skills.length > 0 && skills[0].data
                ? skills[0].data.map((row, id) => (
                  <TableRow key={row.id}>
                    <TableCell>{id + 1}</TableCell>
                    <TableCell>{row.skill}</TableCell>
                    
                    <TableCell align="left">
                      <IconButton
                        aria-label="edit"
                        onClick={(e) => editProject(row.id)}
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
              count={pageCount}
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
        <AddSkill
          open={modelOpen}
          handleClose={() => setModelOpen(false)}
          clickStatus={clickStatus}
          submitSkill={submitSkill}
          createCheck={createCheck}
        />
      )}
    </Container>
  );
}
export default getConnect(Skills);
