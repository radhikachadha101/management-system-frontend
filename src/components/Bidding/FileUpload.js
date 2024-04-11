import React, { useState, useRef, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ViewDocumentModel from './ViewDocument.js';
import { Close } from '@material-ui/icons';
import { red } from "@material-ui/core/colors";

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
  cross:{
    color:"red",
    textDecoration:"bold"
  }
}));
function FileUpload({ handleSubmit, fromRequest, proposalDetail, deleteProposal }) {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [isDrag, setDrag] = useState(false);
  const fileInput = useRef();
  const [modelOpen, setModelOpen] = useState(false);

  const deleteFile = async (i) => {
    if (i > -1) {
      files.splice(i,1);
    }
    const promises = files.map(getPreview);
      setPreviews(await Promise.all(promises));
  }
  useEffect(() => {
    async function getPreviews() {
      const promises = files.map(getPreview);
      setPreviews(await Promise.all(promises));
    }

    getPreviews();
  }, [files]);

  const handleDrop = (e) => {
    e.preventDefault();

    const draggedFiles = [];

    if (e.dataTransfer.items) {
      Array.from(e.dataTransfer.items).forEach((item) => {
        if (item.kind === "file") {
          let file = item.getAsFile();
          draggedFiles.push(file);
        }
      });
    } else {
      Array.from(e.dataTransfer.files).forEach((file) => {
        draggedFiles.push(file);
      });
    }

    setFiles([...draggedFiles, ...files]);
    setDrag(false);
  };

  const handleChange = (e) => {
    let filesArray = [];
    for (let file of e.target.files) {
      if (!file.name.match(/\.(jpg|jpeg|PNG|pdf|doc|docx)$/)) {
        alert("Please select JPG,JPEG,png,Doc,docx,pdf");
        // e.target.value = null;
      } else {
        filesArray.push(file)
      }
    }
    document.getElementById("uploadCaptureInputFile").value = "";
    setFiles([...Array.from(filesArray), ...files]);
  };

  const handleUpload = () => {
    if (!files) {
      return;
    }
    const data = new FormData();
    files.forEach((file) => {
      data.append("files", file);
    });
    // alert("Enter all fields")
    setUploading(true);

    handleSubmit(data);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const handleViewDocs = () => {
    setModelOpen(true);
  };

  const openFileDialog = () => {
    fileInput.current.click();
  };

  return (
    <main >
      {fromRequest == 'edit' ?
        <Button
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleViewDocs}
        >
          view Existing Documents
          </Button> : ''
      }
      <div
        className={`file-upload-container ${isDrag ? "drag" : ""} ${uploading ? "uploading" : ""
          }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input ref={fileInput} type="file" id="uploadCaptureInputFile" multiple onChange={handleChange} />
        <button type="button" onClick={openFileDialog} disabled={uploading}>
          {uploading ? "Uploading files ..." : "Choose Files or Drop"}
        </button>
        <ul className="upload-preview">
          {files.map((file, i) => (
            <li key={file.name}>
              <img src={previews[i]} alt={file.name} />
              <span>{file.name}</span>
              <Close
                fullWidth
                variant="contained"
                color="primary"
                className={classes.cross }
                onClick={() => {
                  deleteFile(i)
                }}

              >
                Remove
            </Close>
            </li>
          ))}
        </ul>
      </div>


      {fromRequest != 'edit' ?
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleUpload}
        >
          Create Proposal
          </Button>

        : <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleUpload}
        >
          Update Proposal
            </Button>}

      {modelOpen && (
        <ViewDocumentModel
          open={modelOpen}
          handleClose={() => setModelOpen(false)}
          proposalDetail={proposalDetail}
          deleteProposal={deleteProposal}
        />
      )}

    </main>


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

export default FileUpload;
