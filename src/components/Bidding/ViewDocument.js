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
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import "./style.css";
import getConnect from "../Common/connect";
import { de } from "date-fns/locale";

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
    width: "540px",
    height: "auto",
    padding: theme.spacing(2, 2, 2),
  },
}));

 function ViewDocumentModel({
  open,
  handleClose,
  proposalDetail,
  deleteProposalDocument,
}) {
  const classes = useStyles();
  const deletefile = (file) => {
    deleteProposalDocument(file.id);
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
          <div className={classes.paper}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <h4 id="transition-modal-title">Existing Documents </h4>

              <Button onClick={handleClose}>
                <CloseIcon />
              </Button>
            </div>

            <div className={`file-upload-container }`}>
              <ul className="upload-preview">
                {proposalDetail.ProposalDocuments.length > 0 ? proposalDetail.ProposalDocuments.map((file, i) => (
                  <li key={file.name} style={{ marginTop: "20px" }}>
                    {/* {file?.mimetype == 'image/png'  ? */}
                    <img src={file.documentUrl} />
                    {/* :  <img src={"http://via.placeholder.com/50x50"} /> } */}
                    <span>{file.filename}</span>
                    <a href={file.documentUrl} target = '_blank'style={{ background: "lightgray",'textAlign': 'center','marginLeft': '20px' }} download >		<IconButton
                          aria-label="edit"
						  style= {{
							borderRadius:'0px',
							background: 'lightgray',
							color: 'black',
							padding: '13px 33px 13px 14px',
              width: 'auto'
						}}
                        >
                          <CloudDownloadIcon />

                        </IconButton>
                      </a>

						<IconButton
                          aria-label="edit"
						  onClick={() => {
                deletefile(file)
                handleClose()
              }}
						  style= {{
							borderRadius:'0px',
							background: 'lightgray',
							color: 'black',
							padding: '13px 33px 13px 14px'
						}}
                        >
                          <DeleteIcon />

                        </IconButton>
                  </li>
                )):<li>Document not found</li>}
              </ul>
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
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
export default getConnect(ViewDocumentModel);
