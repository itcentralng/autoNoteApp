import React, { useEffect } from "react";
import Appdrawer from "../components/Appdrawer";
import { Button, Typography, makeStyles } from "@material-ui/core";
import { CloudUpload, RecordVoiceOver } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { ReactMic } from "react-mic";
import { useState } from "react";

const useStyles = makeStyles((theme) => {
  return {
    recording: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
    },
    recorder: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "3rem",
    },
    btn: {
      width: "fit-content",
      padding: "1rem 3rem",
      fontSize: "1.3rem",
      marginTop: "2rem",
    },
  };
});
function Recording() {
  const classes = useStyles();
  const location = useLocation();
  const [record, setRecord] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const startRecording = () => {
    setRecord(true);
  };

  const stopRecording = () => {
    setRecord(false);
  };
  const onStop = (recordedBlob) => {
    console.log("recordedBlob is: ", recordedBlob);
    setRecordedBlob(recordedBlob);
  };
  const visualSettings = {
    showWave: true,
    waveType: "sine",
    width: 500,
    height: 100,
    backgroundColor: "#f1f1f1",
    strokeColor: "#000000",
  };
  const audioContextAttrs = {
    sampleRate: 44100,
    latencyHint: "interactive",
    blockSize: 512,
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    console.log(file);
    setSelectedFile(file);
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await fetch("https://api.klassnote.itcentral.ng/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      console.log("file successfully uploaded to server", data);
    } catch (error) {
      console.error("There was an error!", error);
      
    }
  };
  
  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);
  return (
    <div className={classes.recording}>
      <Appdrawer />
      {location.pathname === "/record" ? (
        <div className={classes.recorder}>
          <ReactMic record={record} className="sound-wave" onStop={onStop} />
          <Button
            variant="contained"
            className={classes.btn}
            color="secondary"
            onClick={startRecording}
            startIcon={<RecordVoiceOver />}
          >
            Start Recording
          </Button>
          <Button
            variant="contained"
            className={classes.btn}
            color="secondary"
            onClick={stopRecording}
            startIcon={<RecordVoiceOver />}
          >
            Stop Recording
          </Button>
          {recordedBlob && (
            <div>
              <audio src={recordedBlob.blobURL} controls />
            </div>
          )}{" "}
        </div>
      ) : location.pathname === "/upload" ? (
        <div className={classes.recorder}>
          {selectedFile && (
            <div>
              <Typography variant="h4" color="secondary">
                Selected File:
              </Typography>
              <audio controls>
                <source src={URL.createObjectURL(selectedFile)} />
              </audio>
            </div>
          )}{" "}
          <input
            accept="audio/*" // add the accept attribute to specify the types of files that can be selected
            style={{ display: "none" }} // hide the input element
            id="file-input"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file-input">
            <Button
              variant="contained"
              color="secondary"
              className={classes.btn}
              component="span"
              startIcon={<CloudUpload />}
            >
              Upload Audio
            </Button>
          </label>
        </div>
      ) : location.pathname === "/write" ? (
        <Link to="/generator">
          <Button
            variant="contained"
            className={classes.btn}
            color="secondary"
            startIcon={<RecordVoiceOver />}
          >
            Generate Note
          </Button>
        </Link>
      ) : null}
    </div>
  );
}

export default Recording;
