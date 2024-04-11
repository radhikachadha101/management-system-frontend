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
import { useLocation } from 'react-router-dom';

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

function StatusComment({
  open,
  history,
  handleClose,
  getBidStatus,
  bidStatus,
  clickStatus,
  getCountries,
  countries,
  getProposalType,
  proposalType,
  addComment,
  proposalUpdate,
  bidProfiles,
  profiles,
  getPrpoposalById,
  getclients,
  clients,
  proposalDetail,

}) {
  const classes = useStyles();
  const [comment, setComment] = useState("");
  const [bidType, setBidStatusType] = useState(proposalDetail.status.id);
  const [StatusName, setBidStatusName] = useState(proposalDetail.status.status);
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

  const [selectedOption, setselectedOption] = useState("existing");
  const [clientId, setClient] = useState('');
  const [inputList, setInputList] = useState([{ hiredIds: "", contractLimit: "" }]);
  const location = useLocation();
  const id = location.state ? location.state.id : null;


  for (var i in timeZones) {
    offsetTmz.push(
      " (GMT" + moment.tz(timeZones[i]).format("Z") + ") " + timeZones[i]
    );
  }

  useEffect(() => {
    getPrpoposalById(id);
  }, [getPrpoposalById]);


  const handleSubmit = (data) => {
    setSubmit(true);
    const errors = [];

  if (bidType!=5 && comment === "") {
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
      proposalId: proposalDetail.id,
      statusId: bidType,
    //   proposalTypeId: proposaltype,
    };
    addComment(payload);
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
              <h2 id="transition-modal-title">Add Comment</h2>

              <Button onClick={handleClose}>
                <CloseIcon />
              </Button>
            </div>
              <div>
                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                >  
                </FormControl>
              </div>
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
                <div
                style={{
                    display: "flex",
                    marginTop: "10px",
                    justifyContent: "flex-end",
                }}>
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
    </div>
  );
}
export default getConnect(StatusComment);
