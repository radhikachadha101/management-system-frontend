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
        width: "500px",
        height: "auto",
        padding: theme.spacing(2, 2, 2),
    },
}));

function CreateBidStatus({
    open,
    handleClose,
    addstatus,
    editStatus,
    createCheck,
    StatusId
}) {

    const classes = useStyles();
    const [submit, setSubmit] = useState(false);
    const [status, setStatus] = useState('');
    


    useEffect(() => {
        if (createCheck == false) {
            setStatus(StatusId && StatusId.status ? StatusId.status:"");
        }
    }, [StatusId])

    const handleSubmit = (data) => {
        setSubmit(true);
        const errors = [];
        if (status === "" ) {
            errors.push("Field can't be empty");
            return errors;
          }
        let payload = {
            status: status
        };
        if (createCheck == false) {
            editStatus(StatusId.id,payload);
        } else
         {
            addstatus(payload);

        }
        
      
        // setSubmit(true);
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
                            <h2 id="transition-modal-title">Add Status </h2>


                            <Button onClick={handleClose}>
                                <CloseIcon />
                            </Button>
                        </div>
                        <div>
                            <TextField
                                required
                                fullWidth
                                id="filled-requireds"
                                label="Status"
                                value={status}
                                placeholder="Enter skill"
                                variant="outlined"
                                onChange={(e) => setStatus(e.target.value)}
                                aria-describedby="component-error-text"
                                error={submit && !status}

                            />
                        </div>
                        <br />
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
export default getConnect(CreateBidStatus);
