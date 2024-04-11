
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

import "./style.css";
import Grid from "@material-ui/core/Grid";
import getConnect from "../Common/connect";


import { toast } from 'react-toastify';
import { Console } from "winston/lib/winston/transports";
import { addskills } from "../../actions/biddingAction";
import { editSkill } from "../../actions/biddingAction";
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { schemeSet1 } from "d3-scale-chromatic";


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

function AddSkill({
  open,
  value,
  handleClose,
  submitSkill,
  addskills,
  editSkill,
  createCheck,
  SkillUpdated,
  Skill

}) {
  const classes = useStyles();

  const [submit, setSubmit] = useState(false);
  const [inputList, setInputList] = useState([{ skill: "" }]);
  const [skill, setSkill] = useState([{ skill: "" }]);
  // const [SkillName, setSkillName] = useState('');


  const skillName = Skill ? Skill.skill : "";
  const skilli = Skill ? Skill.id : "";
  

  useEffect(() => {
    if (createCheck == false) {
      setSkill(Skill && Skill.skill ? Skill.skill : "");
    }
  }, [Skill])


  const ArrayofSkill = [];
  const [list, setList] = useState([]);

  let payload = {
    skill: skill,
  };

  const handleSubmit = () => {
    setSubmit(true);
    const errors = [];


    if (createCheck == false) {
      editSkill(skilli, payload);
    } else {
      if (list.length == 0) {
        errors.push("Field can't be empty");
        return errors;
      }
      // submitSkill(inputList)
      addskills(list);

    }
  };
  const handleChange = (e) => {
    list.push({ skill: e.target.value, active: "1" })
  }


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
              <h2 id="transition-modal-title">Add Skill</h2>
            </div>
            <div>
              <div className="App">
                <div className="box main-cst">
                  {createCheck
                    ? <Autocomplete
                      fullWidth
                      multiple
                      id="tags-filled"
                      options={ArrayofSkill.map((data) => data)}
                      onChange={handleChange}

                      freeSolo
                      renderTags={(value, getTagProps) =>
                        value.map((data, index) => (
                          <Chip variant="outlined" label={data}  {...getTagProps({ index })} />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField {...params} variant="filled" label="Add Skills" placeholder="enter skills"
                          required
                          error={submit && !value}
                        />
                      )}
                    />
                    : <TextField
                      required
                      fullWidth
                      id="filled-requireds"
                      label="Skill"
                      value={skill}
                      placeholder="Enter Skill"
                      variant="outlined"
                      onChange={(e) => setSkill(e.target.value)}
                      aria-describedby="component-error-text"
                      error={submit && !skill}

                    />
                  }


                </div>



              </div>

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
    </div>
  );
}
export default getConnect(AddSkill);
