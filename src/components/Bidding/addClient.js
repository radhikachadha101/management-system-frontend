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

function CreateClient({
    open,
    handleClose,
    updateClient,
    clientId,
    createCheck,
    getCountries,
    countries,
    addClient
}) {

    const classes = useStyles();
    const offsetTmz = [];
    const [submit, setSubmit] = useState(false);
    const [ClientName, setclientName] = useState("");
    const [timezone, setTimezone] = useState("");
    const [country, setCountry] = useState("");
    const [email, setClientEmail] = useState("");
    const [phone, setClientPhone] = useState("");
    const [othersContact, setOthersContact] = useState("");
    const [clientSharedCredentials, setClientSharedCred] = useState("");


    for (var i in timeZones) {
      offsetTmz.push(
        " (GMT" + moment.tz(timeZones[i]).format("Z") + ") " + timeZones[i]
      );
    }
    useEffect(() => {
      getCountries();
    }, [getCountries]);
  
    

    useEffect(() => {
        if (createCheck == false) {
          setclientName(clientId && clientId.name ? clientId.name:"");
          setClientEmail(clientId && clientId.email ? clientId.email:"");
          setTimezone(clientId && clientId.timezone ? clientId.timezone:"");
          setCountry(clientId && clientId.countryId ? clientId.countryId:"");
          setClientPhone(clientId && clientId.phone ? clientId.phone:"");
          setOthersContact(clientId && clientId.othersContact ? clientId.othersContact:"");
          setClientSharedCred(clientId && clientId.othersContact ? clientId.clientSharedCredentials:"")
        }
    }, [clientId])

   
    const handleSubmit = (data) => {
        setSubmit(true);
        const errors = [];
        let payload = {
            name: ClientName,
            email: email,
            timezone: timezone,
            countryId: country,
            email: email,
            phone: phone,
            othersContact: othersContact,
            clientSharedCredentials: clientSharedCredentials,
        };
        if (createCheck == false) {
          updateClient(clientId.id,payload);
        } else {
          addClient(payload);

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
                            <h2 id="transition-modal-title">Clients </h2>


                            <Button onClick={handleClose}>
                                <CloseIcon />
                            </Button>
                        </div>
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
                          value={ClientName}
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
                          value={timezone}
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
                      >
                        <FormControl
                fullWidth
                variant="outlined"
                className={classes.formControl}
              >
                      <InputLabel id="type-user">Country</InputLabel>
                        <Select
                        required
                        labelId="type-user"
                          id="combo-box-demo"
                          fullWidth
                          onChange={(e, value) => setCountry(e.target.value)}
                          value={country}
                          label="Country"
                          error={submit && !country}
                          >
                          <MenuItem value="-1">
                           <em>None</em>
                             </MenuItem>
                             {countries 
                    ? countries.map((row, id) => (
                        <MenuItem key={row.id} value={row.id}>
                          {row.countryName}
                        </MenuItem>
                      ))
                    : null}
                </Select>
                </FormControl>
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
                          value={email}
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
                          value={phone}
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
                          value={othersContact }
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
                          value={clientSharedCredentials}
                          onChange={(e) => setClientSharedCred(e.target.value)}
                          placeholder="Enter Credentials Shared by Client"
                          variant="outlined"
                          label="Credentials if client shared any ?"
                        />
                      </div>
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
export default getConnect(CreateClient);
