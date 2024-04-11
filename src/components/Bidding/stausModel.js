import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { IconButton } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import getConnect from "../Common/connect";
import { de } from "date-fns/locale";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ClearIcon from '@material-ui/icons/Clear';
import { toast } from 'react-toastify';
import CreateClient from './addClient';

var moment = require("moment-timezone");

var timeZones = moment.tz.names();
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    padding: "4px",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    width: "1000px",
    height: "auto",
    padding: theme.spacing(2, 2, 2),
  },
}));

function StatusModel({
  open,
  handleClose,
  getBidStatus,
  bidStatus,
  clickStatus,
  getCountries,
  countries,
  getProposalType,
  proposalType,
  changeStatus,
  proposalUpdate,
  bidProfiles,
  profiles,
  getclients,
  clients,
  getPrpoposalById,
  proposalDetail,
  getClientById,
  clientAdded,
  clientsUpdateCheck
}) {
  const classes = useStyles();
  const [comment, setComment] = useState("");
  const [bidType, setBidStatusType] = useState(clickStatus.statusId);
  const [submit, setSubmit] = useState(false);
  const offsetTmz = [];
  const [ClientName, setclientName] = useState("");
  const [timezone, setTimezone] = useState("");
  const [country, setCountry] = useState("");
  const [email, setClientEmail] = useState("");
  const [phone, setClientPhone] = useState("");
  const [othersContact, setOthersContact] = useState("");
  const [clientSharedCredentials, setClientSharedCred] = useState("");
  const [proposaltype, setProposalType] = useState("");
  const [modelOpen, setModelOpen] = useState(false);
  const [selectedOption, setselectedOption] = useState("existing");
  const [clientId, setClient] = useState('');
  const [inputList, setInputList] = useState([{ hiredIds: "", contractLimit: "" }]);
  const [createCheck, setCreateCheck] = useState(false);

  const setBidStatusTypeChange = (e) => {
    setBidStatusType(e);
    if (e != 5) {
      setTimezone("");
      setCountry("");
      setProposalType("");
    }
  };


  for (var i in timeZones) {
    offsetTmz.push(
      " (GMT" + moment.tz(timeZones[i]).format("Z") + ") " + timeZones[i]
    );
  }
  // useEffect(()=>{
  //   if(proposalDetail){
  //     setProposalType(proposalDetail.proposalTypeId);
  //     setSubmit(false);
  //   }
  // },[proposalDetail])

  const editClient = (id) => {
    setCreateCheck(false)
    getClientById(id);
    setModelOpen(true);
  };

  useEffect(() => {
    if (clientAdded || clientsUpdateCheck) {
      setModelOpen(false);
      getClientById(id);
    }
  }, [clientAdded,getclients,clientsUpdateCheck])
 let id = clientId;

  useEffect(() => {
    getBidStatus();
    getCountries();
    getProposalType();
    bidProfiles();
    getclients();
    getClientById(id);
  }, [getBidStatus, getCountries, getProposalType, bidProfiles, getclients,getPrpoposalById,getClientById]);

  const handleSubmit = (data) => {
    setSubmit(true);
    const errors = [];

  if (comment === "") {
    errors.push("comment can't be empty");
    return errors;
  }
  
    let hireIds = inputList.map(item => {
      return {
        profileId: item.hiredIds,
        contractLimit: item.contractLimit,
      };
    });

    let payload = {
      comment: comment,
      proposalId: clickStatus.id,
      statusId: bidType,
      name: ClientName,
      timezone: timezone,
      countryId: country,
      email: email,
      phone: phone,
      othersContact: othersContact,
      clientSharedCredentials: clientSharedCredentials,
      proposalTypeId: proposaltype,
      hiredIds: hireIds,
      clientId:clientId
    };
    changeStatus(payload);
    // setSubmit(true);
  };

  const onChangeValue = (event) => {
    setselectedOption(event.target.value);
  };
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    let isPresent = inputList.some(function (el) { return el.hiredIds === value });

    if (isPresent) {
      toast.error('Profile is already Selected');
      return;
    }
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    
    let lastItem = inputList[inputList.length - 1]
    if (lastItem.hiredIds && lastItem.contractLimit) {
      setInputList([...inputList, { hiredIds: "", contractLimit: "" }]);
    }else{
      if(!lastItem.hiredIds){
      toast.error('Please Select Profile');
    }
    if(!lastItem.contractLimit){
      toast.error('Please Enter Contract Limit');
     }
    }

  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper + " cstModal"}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <h2 id="transition-modal-title">Change Status</h2>

              <Button onClick={handleClose}>
                <CloseIcon />
              </Button>
            </div>
            <div>
              <div>
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
                    onChange={(e) => setBidStatusTypeChange(e.target.value)}
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
              </div>
              {bidType != 5 ? (
                <div style={{ margin: "10px 0px" }}>
                  <TextField
                  required
                    id="outlined-multiline-static"
                    fullWidth
                    multiline
                    rows={4}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Comment"
                    variant="outlined"
                    label="Comment"
                    error={submit && !comment}
                  />
                </div>
              ) : (
                ""
              )}

              {bidType == 5 ? (
                <div>
                  <div onChange={onChangeValue} style={{ margin: "24px 0px" }}>
                    <input
                      type="radio"
                      value="existing"
                      checked={selectedOption === "existing"}
                      name="gender"
                    />
                     Existing client{" "}
                    <input
                      type="radio"
                      value="newClient"
                      checked={selectedOption === "newClient"}
                      name="gender"
                    />
                    New Client{" "}
                  </div>
                  {selectedOption == "existing" ? (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "20px",
                          marginTop: "20px",
                        }}
                      >
                        <Autocomplete
                          fullWidth
                          id="combo-box-demo"
                          options={clients}
                          name="Client"
                          getOptionLabel={(option) =>
                            option.name + "(" + option.email + ")"
                          }
                          onChange={(e, value) => setClient(value.id)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Client"
                              variant="outlined"
                              error={submit && !clientId}
                              required
                            />
                          )}
                        />
                        {clientId != "" ?
                         <IconButton
                        aria-label="edit"
                        onClick={(e, value) => editClient(clientId)}
                      >
                        <CreateIcon />
                      </IconButton>
                         : "" }
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {selectedOption == "newClient" ? (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "20px",
                          marginTop: "20px",
                        }}
                      >
                        <h4 id="transition-modal-title">Client Details</h4>
                      </div>
                      <div>
                        <TextField
                          required
                          fullWidth
                          id="filled-required"
                          label="Client Name"
                          onChange={(e) => setclientName(e.target.value)}
                          placeholder="Enter Client Name"
                          variant="outlined"
                          aria-describedby="component-error-text"
                          error={submit && !ClientName}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "20px",
                          marginTop: "20px",
                        }}
                      >
                        <Autocomplete
                          fullWidth
                          id="combo-box-demo"
                          options={offsetTmz}
                          getOptionLabel={(option) => option}
                          onChange={(e, value) => setTimezone(value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Timezone"
                              variant="outlined"
                              error={submit && !timezone}
                              required
                            />
                          )}
                        />
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "20px",
                          marginTop: "20px",
                        }}
                      >
                        <Autocomplete
                          id="combo-box-demo"
                          fullWidth
                          options={countries}
                          getOptionLabel={(option) => option.countryName}
                          onChange={(e, value) => setCountry(value.id)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Country"
                              variant="outlined" 
                              error={submit && !country}
                              required

                            />
                          )}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "20px",
                          marginTop: "20px",
                        }}
                      >
                        <h4 id="transition-modal-title">Contact Details</h4>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "20px",
                          marginTop: "20px",
                        }}
                      >
                        <TextField
                          required
                          fullWidth
                          id="filled-required"
                          label="Client Email"
                          onChange={(e) => setClientEmail(e.target.value)}
                          placeholder="Enter Client Email"
                          variant="outlined"
                          aria-describedby="component-error-text"
                          error={submit && !email}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "20px",
                          marginTop: "20px",
                        }}
                      >
                        <TextField
                          required
                          fullWidth
                          id="filled-required"
                          label="Client Phone"
                          onChange={(e) => setClientPhone(e.target.value)}
                          placeholder="Enter Client Phone Number"
                          variant="outlined"
                          aria-describedby="component-error-text"
                          error={submit && !phone}
                        />
                      </div>
                      <div style={{ margin: "10px 0px" }}>
                        <TextField
                          id="outlined-multiline-static"
                          fullWidth
                          multiline
                          rows={3}
                          onChange={(e) => setOthersContact(e.target.value)}
                          placeholder="Others"
                          variant="outlined"
                          label="Other's Contact"
                        />
                      </div>
                      <div style={{ margin: "10px 0px" }}>
                        <TextField
                          id="outlined-multiline-static"
                          fullWidth
                          multiline
                          rows={3}
                          onChange={(e) => setClientSharedCred(e.target.value)}
                          placeholder="Enter Credentials Shared by Client"
                          variant="outlined"
                          label="Credentials if client shared any ?"
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div>
                    {/* <div style={{ margin: "10px 0px" }}>
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
                    </div> */}
                    {/* this is Add /remove */}
                    <div className="App">
                      {inputList.map((x, i) => {
                        return (
                          <div className="box main-cst">
                            <Grid item xs={5} style={{ margin: "10px 26px 10px 0px" }}>

                              <FormControl
                                fullWidth
                                variant="outlined"
                                className={classes.formControl}
                              >
                                <InputLabel id="type-user">Profiles Id</InputLabel>
                                <Select
                                  required
                                  labelId="type-user"
                                  id="typeUserId"
                                  value={x.hiredIds}
                                  onChange={(e) => handleInputChange(e, i)}
                                  name="hiredIds"
                                  label="Profile Id"
                                  error={submit && !inputList}
                                >
                                  <MenuItem value="-1">
                                    <em>None</em>
                                  </MenuItem>
                                  {profiles && profiles.length
                                    ? profiles.map((row, id) => (
                                      <MenuItem key={row.id} value={row.id}>
                                        {row.name + "(" + row.email + ")"}
                                      </MenuItem>
                                    ))
                                    : null}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={5} style={{ margin: "10px 26px 10px 0px" }}>
                              <TextField
                                fullWidth
                                multiline
                                value={x.contractLimit}
                                onChange={(e) => handleInputChange(e, i)}
                                name="contractLimit"
                                placeholder="Enter Contract Limit"
                                variant="outlined"
                                label="Contract Limit"
                                required
                                id="filled-required"
                                variant="outlined"
                                aria-describedby="component-error-text"
                                error={submit && !inputList}
                              />
                            </Grid>
                            <Grid item xs={5} style={{ margin: "10px 26px 10px 0px" }}>
                            <div style={{ margin: "10px 0px" }}>
                  <TextField
                  required
                    id="outlined-multiline-static"
                    fullWidth
                    multiline
                    rows={4}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Comment"
                    variant="outlined"
                    label="Comment"
                    error={submit && !comment}
                  />
                </div>
                </Grid>
                            <Grid item xs={2} style={{ margin: "10px 26px 10px 0px" }}>
                              {inputList.length !== 1 && (
                                <ClearIcon style={{
                                  cursor: 'pointer'
                                }}
                                  className="mr10"
                                  onClick={() => handleRemoveClick(i)}
                                />

                              )}
                              {inputList.length - 1 === i && (
                                <AddCircleIcon style={{
                                  cursor: 'pointer'
                                }}
                                  onClick={handleAddClick} />
                              )}
                            </Grid>
                          </div>
                        );
                      })}
                    </div>
                    {/* END */}
                  </div>
                </div>
              ) : (
                ""
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              ></div>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "10px",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="contained"
                onClick={handleClose}
                startIcon={<CloseIcon />}
                component="label"
              >
                Cancel
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                variant="contained"
                onClick={handleSubmit}
                startIcon={<SaveIcon />}
                component="label"
              >
                Save
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
      {modelOpen && (
        <CreateClient
          open={modelOpen}
          handleClose={() => setModelOpen(false)}
          clickStatus={clickStatus}
          createCheck={createCheck}
        />
      )}
    </div>
  );
}
export default getConnect(StatusModel);
