import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { Alert } from "@material-ui/lab";
import { AlertTitle } from "@material-ui/lab";
import getConnect from "../Common/connect";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Autocomplete from "@material-ui/lab/Autocomplete";
// import DateFnsUtils from "@date-io/date-fns";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import AdapterDateFns from '@mui/x-date-pickers/AdapterDateFns';

// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import FileUpload from "./FileUpload";
import Chip from "@material-ui/core/Chip";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from "react-router-dom";

import "./style.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker, TimePicker } from '@mui/lab';
import { DatePicker, TimePicker } from "@mui/x-date-pickers";

// import TextField from '@mui/material/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
const useStyles = makeStyles((theme) => ({
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
}));

function CreateProposal({
  userActionPerformed,
  proposalAdded,
  addProposal,
  getSkills,
  skills,
  getBidStatus,
  getChannels,
  channels,
  bidStatus,
  getProposalType,
  proposalType,
  bidProfiles,
  profiles,
  input,
  meta,
}) {
  const getName = (option, withUsername) =>
    `${option.skill ? option.skill : ""}`;

  const classes = useStyles();
  const navigate = useNavigate();
  const [proposalName, setProposalName] = useState("");
  const [profileId, setProfileId] = useState("");
  const [channeltype, setChannelType] = useState("");
  const [proposaltype, setProposalType] = useState("");
  const [bidType, setBidStatusType] = useState("");
  const [submit, setSubmit] = useState(false);
  const [skill, setSkills] = useState([]);
  const [description, setDescription] = useState("");
  // const [editorState, setEditorState] = useState( () => EditorState.createEmpty());
  const [proposalLink, setProposalLink] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [rate, setRate] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    if (proposalAdded) {
      navigate("/proposals");
    }
  }, [proposalAdded]);

  const [filterUsers, setFilterUsers] = useState([]);
  useEffect(() => {
    getSkills();
    getBidStatus();
    getChannels();
    getProposalType();
    bidProfiles();
  }, [getSkills, getBidStatus, getChannels, getProposalType, bidProfiles]);

  useEffect(() => {
    if (skills && skills.length) {
      setFilterUsers(skills);
    }
  }, [skills]);

  const handleSubmit = (data) => {
    setSubmit(true);
    if (proposalName && profileId && rate && channeltype && proposaltype) {
      let skillData = skill.map((a) => a.id);
      data.append("name", proposalName);
      data.append("profileId", profileId);
      data.append("channelId", channeltype);
      data.append("proposalTypeId", proposaltype);
      data.append("statusId", 4);
      data.append("description", description);
      data.append("proposalLink", proposalLink);
      data.append("jobUrl", jobUrl);
      data.append("rate", rate);
      data.append("proposalDate", selectedDate);
      data.append("skill", JSON.stringify(skillData));

      let payload = {
        name: proposalName,
        profileId: profileId,
        channelId: channeltype,
        proposalTypeId: proposaltype,
        statusId: bidType,
        description: description,
        proposalLink: proposalLink,
        rate: rate,
        proposalDate: selectedDate,
        jobUrl: jobUrl,
      };
      payload["skill"] = skill.map((a) => a.id);
      addProposal(data);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create Proposal
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="url"
                variant="outlined"
                required
                fullWidth
                id="jobUrl"
                label="Job Url"
                name="jobUrl"
                autoFocus
                autoComplete="jobUrl"
                onChange={(e) => {
                  setRate(e.target.value);
                  const amount = e.target.value;
                  if (
                    !amount ||
                    amount.match(
                      /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/
                    )
                  ) {
                    setJobUrl(e.target.value); // Set job URL here if the condition passes
                  } else {
                    alert("Enter only URL");
                  }
                }}
                value={jobUrl}
                error={submit && !jobUrl}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                autoComplete="name"
                name="proposalName"
                variant="outlined"
                fullWidth
                id="proposalName"
                label="Job title"
                onChange={(e) => setProposalName(e.target.value)}
                value={proposalName}
                error={submit && !proposalName}
              />
            </Grid>
            <Grid item xs={12}>
              <div className="App">
                <h6>Description</h6>
                <CKEditor
                  editor={ClassicEditor}
                  data=""
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDescription(data);
                  }}
                  onBlur={(event, editor) => {}}
                  onFocus={(event, editor) => {}}
                />
              </div>
            </Grid>

            <Grid item xs={12}>
              <FormControl
                fullWidth
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="type-user">Profile Id</InputLabel>
                <Select
                  required
                  labelId="type-user"
                  id="typeUserId"
                  value={profileId}
                  fullWidth
                  onChange={(e) => setProfileId(e.target.value)}
                  label="Channel Type"
                  error={submit && !profileId}
                >
                  <MenuItem value="-1">
                    <em>None</em>
                  </MenuItem>
                  {profiles && profiles.length
                    ? profiles.map((row, id) => (
                        <MenuItem key={row.id} value={row.id}>
                          {row.email}
                        </MenuItem>
                      ))
                    : null}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="proposalLink"
                label="Proposal Link"
                name="proposalLink"
                autoComplete="proposalLink"
                onChange={(e) => setProposalLink(e.target.value)}
                value={proposalLink}
                error={submit && !proposalLink}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="type-user">Proposal Type</InputLabel>
                <Select
                  required
                  labelId="type-user"
                  id="typeUserId"
                  value={proposaltype}
                  fullWidth
                  onChange={(e) => setProposalType(e.target.value)}
                  label="Proposal type"
                  error={submit && !proposaltype}
                >
                  <MenuItem value="-1">
                    <em>None</em>
                  </MenuItem>
                  {proposalType && proposalType.length
                    ? proposalType.map((row, id) => (
                        <MenuItem key={row.id} value={row.id}>
                          {row.proposal}
                        </MenuItem>
                      ))
                    : null}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="rate"
                label="Rate"
                type="text"
                id="rate"
                autoComplete="current-password"
                onChange={(e) => {
                  const amount = e.target.value;
                  if (!amount || amount.match(/^\d{1,}(\d{0,4})?$/)) {
                    setRate(e.target.value);
                  } else {
                    alert("Enter number value only");
                  }
                }}
                value={rate}
                error={submit && !rate}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="skills"
                name="skills"
                options={filterUsers}
                getOptionLabel={(option) => getName(option, false)}
                value={skill ? skill : []}
                onChange={(e, n) => setSkills(n)}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Skillsss"
                    placeholder="Search Skills"
                    required
                    error={submit && !skill}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Proposal date"
                type="date"
                value={selectedDate.toISOString().split("T")[0]}
                format="MM/dd/yyyy"
                onChange={(e) => handleDateChange(new Date(e.target.value))}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
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
                  value={channeltype}
                  fullWidth
                  onChange={(e) => setChannelType(e.target.value)}
                  label="Channel Type"
                  error={submit && !channeltype}
                >
                  <MenuItem value="-1">
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
          </Grid>
          <Grid item xs={12}>
            <br />
            <h4>Upload Documents </h4>
            <FileUpload
              handleSubmit={handleSubmit}
              fromRequest="create"
              proposalDetail={null}
            />
          </Grid>
        </form>
      </div>
    </Container>
  );
}
export default getConnect(CreateProposal);
