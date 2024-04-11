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
import FileUpload from "./FileUpload";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate, useLocation } from 'react-router-dom';
import { format } from 'date-fns';


import "./style.css";
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

function EditProposal({
  history,
  userActionPerformed,
  getPrpoposalById,
  proposalUpdate,
  addProposal,
  getSkills,
  skills,
  getBidStatus,
  getChannels,
  channels,
  bidStatus,
  getProposalType,
  proposalType,
  proposalDetail,
  updateProposal,
  poposalDeleted,
  bidProfiles,
  profiles
}) {
 
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [proposalName, setProposalName] = useState("");
  const [profileId, setProfileId] = useState("");
  const [channeltype, setChannelType] = useState("-1");
  const [proposaltype, setProposalType] = useState("-1");
  const [bidType, setBidStatusType] = useState("-1");
  const [submit, setSubmit] = useState(false);
  const [skill, setSkills] = useState([]);
  const [description, setDescription] = useState([]);
  const [proposalLink, setProposalLink] = useState([]);
  const [jobUrl, setJobUrl] = useState([]);
  const [rate, setRate] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const id = location.state ? location.state.id : null;


useEffect(() => {
if (poposalDeleted == true) {
  getPrpoposalById(id);
  getSkills();
  getBidStatus();
  getChannels();
  getProposalType();
  bidProfiles();
}
}, [getSkills, getBidStatus, getChannels, getProposalType, getPrpoposalById,poposalDeleted,bidProfiles]);
  
  useEffect(() => {
    if (proposalDetail) {
      setDescription(proposalDetail.description);
      setProposalName(proposalDetail.name);
      setChannelType(proposalDetail.channelId);
      setProposalType(proposalDetail.proposalTypeId);
      setBidStatusType(proposalDetail.statusId);
      setSkills(
        proposalDetail?.proposalSkill
          ? proposalDetail.proposalSkill.map((a) => a.skill)
          : []
      );
      setProposalLink(proposalDetail.proposalLink);
      setJobUrl(proposalDetail.jobUrl);
      setRate(proposalDetail.rate);
      setSelectedDate(proposalDetail?.proposalDate ? proposalDetail?.proposalDate : new Date());
      setProfileId(proposalDetail.profileId);
      setSubmit(false);
    }
  }, [proposalDetail]);
  const handleDateChange = (  date) => {  
    setSelectedDate(date);
  };
   
  useEffect(() => {
    if (proposalUpdate) {
    navigate("/proposals");
    }
  }, [proposalUpdate]);

  const [filterSkills, setFilterSkills] = useState([]);
  useEffect(() => {
    getPrpoposalById(id);
    getSkills();
    getBidStatus();
    getChannels();
    getProposalType();
    bidProfiles();

  }, [getSkills, getBidStatus, getChannels, getProposalType, getPrpoposalById,bidProfiles]);

  useEffect(() => {
    if (skill && skill.length) {
      let data = [];
      for (let skill of skills) {
        let i = 0;
        if (proposalDetail.proposalSkill.length > 0) {
          if (proposalDetail.proposalSkill[i].skillId != skill.id) {
            data.push(skill);
          }
        } else {
          data.push(skill);
        }
        i++;
      }
      setFilterSkills(data);
    } else {
      setFilterSkills(skills);
    }
  }, [skill, skills]);

  const getName = (option, withUsername) =>
  `${option.skill ? option.skill : ""}`;

  console.log("selectedDate ",selectedDate)

  const handleSubmit = (data) => {
    setSubmit(true);
    if (proposalName && profileId && rate && channeltype && proposaltype && jobUrl) {
      let skillData = skill.map((a) => a.id);
      data.append("name", proposalName);
      data.append("profileId", profileId);
      data.append("channelId", channeltype);
      data.append("proposalTypeId", proposaltype);
      data.append("statusId", bidType);
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
        jobUrl:jobUrl,
        rate: rate,
        proposalDate: selectedDate,
      };
      payload["skill"] = skill.map((a) => a.id);
      
      updateProposal(id,data);
    }
  };
  
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Update  Proposal
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="jobUrl"
                label="Job Url"
                name="jobUrl"
                autoComplete="jobUrl"
                onChange={(e) => setJobUrl(e.target.value)}
                value={jobUrl}
                autoFocus
                error={submit && !jobUrl}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                autoComplete="name"
                required
                name="proposalName"
                fullWidth
                id="proposalName"
                label="Job title"
                onChange={(e) => setProposalName(e.target.value)}
                value={proposalName}
                error={submit && !proposalName}
              />
            </Grid>

            <Grid item xs={12}>
            {/* <Editor
                id="outlined-multiline-static"
                fullWidth
                required
                // multiline
                label="Description"
                // rows={4}
                placeholder="Description"
                variant="outlined"
                defaultContentState={contentState}
                contentState={contentState}
                onContentStateChange={setContentState}
                // defaultContentState={contentState}
              /> */}
              <div className="App">
                <h6>Description</h6>
                <CKEditor
                    editor={ ClassicEditor }
                    data={proposalDetail.description ? proposalDetail.description: ""}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setDescription(data);
                    } }
                    onBlur={ ( event, editor ) => {
                    } }
                    onFocus={ ( event, editor ) => {
                    } }
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
                onChange={(e) =>{ const amount = e.target.value;
                  if (!amount || amount.match(/^\d{1,}(\.\d{0,4})?$/)) {
                  setRate(e.target.value) }
                  else {
                    alert("enter only decimal value"); } } }
                value={rate}
                error={submit && !rate}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="skills"
                name="skills"
                options={filterSkills}
                getOptionLabel={(option) => getName(option, false)}
                value={skill?skill:[]}
                onChange={(e, n) => setSkills(n)}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Skills"
                    placeholder="Search Skills"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
  <TextField
    label="Proposal date"
    type="date"
    id="date-picker-dialog"
    value={format(selectedDate, 'yyyy-MM-dd')}
    onChange={(e) => handleDateChange(new Date(e.target.value))}
    InputLabelProps={{
      shrink: true,
    }}
  />
</Grid>
            {/* <Grid item xs={12} sm={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Proposal date"
                  format="MM/dd/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Proposal Time"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid> */}
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
            <Grid item xs={12}>
              <FormControl
                fullWidth
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="type-user">Status</InputLabel>
                <Select
                  required
                  labelId="type-user"
                  id="typeUserId"
                  value={bidType}
                  fullWidth
                  onChange={(e) => setBidStatusType(e.target.value)}
                  label="Type"
                  error={submit && !bidType}
                >
                  <MenuItem value="-1">
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
          </Grid>
          
          <Grid item xs={12}>
            <br />
            <h4>Upload Documents </h4>
            <FileUpload
              handleSubmit={handleSubmit}
              fromRequest="edit"
              proposalDetail={proposalDetail}
            
            />
          </Grid>
        </form>
      </div>
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
export default getConnect(EditProposal);
