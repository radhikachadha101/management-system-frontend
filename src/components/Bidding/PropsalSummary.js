import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import getConnect from "../Common/connect";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DateFnsUtils from "@date-io/date-fns";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { Close } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import "./style.css";
import moment from "moment";
import Avatar from "@material-ui/core/Avatar";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import StatusComment from './AddComments';
import { api } from '../../config/env';
import {Link} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },

  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  overFlow: {
    display: "block",
    width: 200,
    overflow: "hidden",
    textOverflow: 'ellipsis',
    paddingTop:20
  },
  profile:{
    paddingTop:20
  }
}));

function TabPanel({
  children,
  value,
  index,
  history,
  userActionPerformed,
  getPrpoposalById,
  proposalDetail,
  check,
  commentAdd,
  ...other
}) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

function ProposalSummary({
  history,
  userActionPerformed,
  getPrpoposalById,
  proposalDetail,
  commentAdd
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [modelOpen, setModelOpen] = useState(false);
  const location = useLocation();
  const id = location.state ? location.state.id : null;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeStatus = () => {
    setModelOpen(true);
  };
  
  useEffect(() => {
    if (commentAdd) {
      setModelOpen(false);
      getPrpoposalById(id);
      // getBidProfiles(offset, limit, search);
    }
  }, [commentAdd, getPrpoposalById]);

  useEffect(() => {
    async function getPreviews() {
      const promises = files.map(getPreview);
      setPreviews(await Promise.all(promises));
    }



    getPreviews();
  }, [files]);

  useEffect(() => {
    getPrpoposalById(id);
  }, [getPrpoposalById]);

  var check = 1;
  var length = (proposalDetail.HiredProposalProfile ? proposalDetail.HiredProposalProfile.length : 0)
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper + " text-lefts"}>
        <Typography component="h1" variant="h5">
          Proposal Summary
        </Typography>
      </div>

      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Proposal Detail" {...a11yProps(0)} />
            <Tab label="Proposal Description" {...a11yProps(1)} />
            <Tab label="Proposal documents" {...a11yProps(2)} />
            <Tab label="Proposal Comments" {...a11yProps(3)} />
            {proposalDetail?.HiredProposalProfile?.length > 0 ?
              <Tab label="Hired Profiles" {...a11yProps(4)} />
              : ""}
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>

          <h3 className="text-center"><b>Proposal Detail</b></h3>
          <div className="main-cst">
            <div className="main-col">
              <div className="main-cst-con">
                <div className="main-col-cst"><b>Job title</b></div>
                <div className="main-col-cst"> : {proposalDetail.name}</div>
              </div>
              <div className="main-cst-con">
                <div className="main-col-cst"><b>Profile ID</b></div>
                <div  className={`main-col-cst ${classes.profile}`}>
                  : {proposalDetail.profile ? proposalDetail.profile.email : ""}
                </div>
              </div>
              <div className="main-cst-con">
                <div className="main-col-cst">
                  <b>Proposal Link</b></div>
                <div className={`main-col-cst ${classes.overFlow}`}>
                {proposalDetail && proposalDetail.proposalLink ?
                   <Link to={{ pathname: `${proposalDetail.proposalLink}` }} target="_blank">
                    :{proposalDetail.proposalLink ? proposalDetail.proposalLink:""}</Link> 
                    :""}
                </div>
              </div>
              <div className="main-cst-con">
                <div className="main-col-cst"><b>Skills</b></div>
                <div className="main-col-cst">
                  {" "}
                  :
                  {proposalDetail.proposalSkill &&
                    proposalDetail.proposalSkill.length
                    ? proposalDetail.proposalSkill.map((row, id) => (
                      <span>{row.skill.skill},</span>
                    ))
                    : null}
                </div>
              </div>
              <div className="main-cst-con">
                <div className="main-col-cst"><b>Job Url</b></div>
                <div className={`main-col-cst ${classes.overFlow}`}> 
                 {proposalDetail && proposalDetail.jobUrl ?
                <Link to={{ pathname: `${proposalDetail.jobUrl}` }} target="_blank">
                :{proposalDetail.jobUrl}
                </Link>
                :"" }
                </div>
              </div>
              </div>
            <div className="main-col">
            <div className="main-cst-con">
                <div className="main-col-cst"><b>Proposal Type</b></div>
                <div className="main-col-cst">
                  {" "}
                  : {proposalDetail?.proposalType?.proposal}
                </div>
              </div>
              <div className="main-cst-con">
                <div className="main-col-cst"><b>Rate</b></div>
                <div className="main-col-cst"> : {proposalDetail.rate}</div>
              </div>
              <div className="main-cst-con">
                <div className="main-col-cst"><b>Channel</b></div>
                <div className="main-col-cst">
                  {" "}
                  : {proposalDetail?.channel?.channel}
                </div>
              </div>
              <div className="main-cst-con">
                <div className="main-col-cst"><b>Current Status</b></div>
                <div className="main-col-cst">
                  {" "}
                  : {proposalDetail?.status?.status}
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="comments">
            <div style={{ marginTop: '10px' }}>
              <Grid container spacing={3} justify="flex-end">
                <Grid item xs={9} md={10} lg={10}>
                  <h4 className="text-center" style={{ margin: '20px' }}>Description</h4>
                </Grid>
                <Grid item xs={3} md={2} lg={2}>
                </Grid>
              </Grid>
            </div>

            {proposalDetail? (
              <div className="comment">
                    <div className="body"
                      dangerouslySetInnerHTML= {{__html:proposalDetail.description}}
                    />
                  
               
              </div>):""}
          </div>
        </TabPanel>


        <TabPanel value={value} index={2}>
          <h4 className="text-center" style={{ margin: "20px" }}>
            Proposal Documents
          </h4>
          <div className={`file-upload-container`}>
            <ul className="upload-preview">
              {proposalDetail?.ProposalDocuments?.map((file, i) => (
                <li key={file.name} style={{ marginTop: "20px" }}>
                  <img src={api + file.filePath} />
                  <span>{file.filename}</span>
                  <a
                    href={api + file.filePath}
                    target="_blank"
                    style={{
                      background: "lightgray",
                      textAlign: "center",
                      marginLeft: "20px",
                    }}
                    download
                  >
                    <IconButton
                      aria-label="edit"
                      style={{
                        borderRadius: "0px",
                        background: "lightgray",
                        color: "black",
                        padding: "13px 33px 13px 14px",
                        width: "auto",
                      }}
                    >
                      <CloudDownloadIcon />
                    </IconButton>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <div className="comments">
            <div style={{ marginTop: '10px' }}>
              <Grid container spacing={3} justify="flex-end">
                <Grid item xs={9} md={10} lg={10}>
                  <h4 className="text-center" style={{ margin: '20px' }}>Comments</h4>
                </Grid>
                <Grid item xs={3} md={2} lg={2}>
                  <button
                    onClick={() => handleChangeStatus()}
                    className="btn btn-primary">
                    ADD COMMENTS
                  </button>

                </Grid>
              </Grid>
            </div>

            {proposalDetail?.ProposalComments?.slice(0).reverse()?.map((row, id) => (
              <div className="comment">
                <div className="comment__user">
                  <Avatar alt="Remy Sharp" src="https://picsum.photos/200/200" />
                  <div>
                    <div className="title">
                      <h5>{row.user.firstName + row.user.lastName}</h5>

                      {/* <p className="role">Content Writer</p> */}
                    </div>
                    <div className="body">
                      <p>
                        {row.comment}
                      </p>

                      <p>
                        <strong>Status:</strong>{row.status.status}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="comment__detail">
                  <p className="comment__time">{moment(row.createdAt).fromNow()}</p>
                  &nbsp;&nbsp;&nbsp;
                </div>
              </div>))}
          </div>
        </TabPanel>
        <TabPanel value={value} index={4}  >

          <div className="main-cst" >
            <div className="main-col">
              <h4 className="text-center"><h1>Client Details</h1></h4>
              <div className="main-cst-containers">
                <div className="main-col-cst"><b>Client Name</b></div>
                <div className="main-col-cst">
                  {" "}
                  : {proposalDetail?.ClientDetail?.name}
                </div>
              </div>
              <div className="main-cst-containers">
                <div className="main-col-cst"><b>Country</b></div>
                <div className="main-col-cst">
                  {" "}
                  : {proposalDetail?.ClientDetail?.country?.countryName}
                </div>
              </div>
              <div className="main-cst-containers">
                <div className="main-col-cst"><b>Email</b></div>
                <div className="main-col-cst">
                  {" "}
                  : {proposalDetail?.ClientDetail?.email}
                </div>
              </div>
              <div className="main-cst-containers">
                <div className="main-col-cst"><b>Phone</b></div>
                <div className="main-col-cst">
                  {" "}
                  : {proposalDetail?.ClientDetail?.phone}
                </div>
              </div>
              <div className="main-cst-containers">
                <div className="main-col-cst"><b>Others Contact</b></div>
                <div className="main-col-cst">
                  {" "}
                  : {proposalDetail?.ClientDetail?.othersContact}
                </div>
              </div>
              <div className="main-cst-containers">
                <div className="main-col-cst"><b>Client shared Credentials</b></div>
                <div className="main-col-cst">
                  {" "}
                  : {proposalDetail?.ClientDetail?.clientSharedCredentials}
                </div>
              </div>
            </div>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Profile Name </TableCell>
                    <TableCell align="left">Hired Profile Id </TableCell>
                    <TableCell align="left">Client Name</TableCell>
                    <TableCell align="left">Contract Limit</TableCell>
                    <TableCell align="left">Proposal Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {proposalDetail?.HiredProposalProfile?.map((row) => (

                    <TableRow >
                      <TableCell align="left">{row.profile.name}</TableCell>
                      <TableCell align="left">{row.profile.email}</TableCell>
                      <TableCell align="left">{row.client.name}</TableCell>
                      <TableCell align="left">{row.contractLimit}</TableCell>
                      <TableCell align="left">{proposalDetail.proposalType.proposal}</TableCell>
                    </TableRow>

                  ))}

                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </TabPanel>
      </div>

      {modelOpen && (
        <StatusComment
          open={modelOpen}
          handleClose={() => setModelOpen(false)}
        // clickStatus={clickStatus}
        // proposalUpdate={proposalUpdate}
        />
      )}
    </Container>

  );

}
function getPreview(file) {
  return new Promise((resolve) => {
    if (file && file.type.includes("image")) {
      let reader = new FileReader();

      reader.onloadend = function () {
        resolve(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      resolve("http://via.placeholder.com/50x50");
    }
  });
}
export default getConnect(ProposalSummary);
