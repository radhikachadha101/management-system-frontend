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

function CreateBidProfile({
    open,
    handleClose,
    createProfile,
    editProfile,
    profile,
    createCheck
}) {

    const classes = useStyles();
    const [submit, setSubmit] = useState(false);
    const [email, setProfileEmail] = useState('');
    const [name, setProfileName] = useState('');


    useEffect(() => {
        if (createCheck == false) {
            setProfileEmail( profile && profile.email ? profile.email:"");
            setProfileName(profile && profile.name ? profile.name:"");
        }
    }, [profile])

   
    const handleSubmit = (data) => {
        setSubmit(true);
        const errors = [];
        if (name === "" || email === "" ) {
            errors.push("Field can't be empty");
            return errors;
          }
        let payload = {
            name: name,
            email: email,
        };
        if (createCheck == false) {
            editProfile(profile.id,payload);
        } else {
            createProfile(payload);

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
                            <h2 id="transition-modal-title">Add Profile </h2>


                            <Button onClick={handleClose}>
                                <CloseIcon />
                            </Button>
                        </div>
                        <div>
                            <TextField
                                required
                                fullWidth
                                id="filled-requireds"
                                label="Name"
                                value={name}
                                placeholder="Enter name"
                                variant="outlined"
                                onChange={(e) => setProfileName(e.target.value)}
                                aria-describedby="component-error-text"
                                error={submit && !name}

                            />
                        </div>
                        <br />
                        <div>
                            <TextField
                                required
                                fullWidth
                                id="filled-required"
                                label="Email"
                                value={email}
                                placeholder="Enter email"
                                variant="outlined"
                                onChange={(e) => setProfileEmail(e.target.value)}
                                aria-describedby="component-error-text"
                                error={submit && !email}

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
export default getConnect(CreateBidProfile);
