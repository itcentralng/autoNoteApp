import React, { useEffect } from "react";
import Appdrawer from "../components/Appdrawer";
import { Button, Typography, makeStyles,TextField } from "@material-ui/core";
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
    write: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "3rem",
    },
  };
});
function Recording() {
  const classes = useStyles();
  const location = useLocation();
  const [record, setRecord] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [curriculum, setCurriculum] = useState("");
  const [level, setLevel] = useState("");

  const formObj = [
    {
      label: "Subject",
    },
    {
      label: "Topic",
    },
    {
      label: "Curriculum",
    },
    {
      label: "Level",
    },
  ];

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
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setSelectedFile(file);
    // do something with the selected file here
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
        <div className={classes.write}>
          <form className={classes.form}>
            {formObj.map((form) => {
              return (
                <TextField
                  fullWidth
                  variant="outlined"
                  // value={}
                  onChange={(e) => {
                    if (form.label === "Subject") {
                      setSubject(e.target.value);
                    } else if (form.label === "Topic") {
                      setTopic(e.target.value);
                    } else if (form.label === "Curriculum") {
                      setCurriculum(e.target.value);
                    } else if (form.label === "Level") {
                      setLevel(e.target.value);
                    }
                  }}
                  label={form.label}
                  InputLabelProps={{
                    style: {
                      color: "black",
                    },
                  }}
                  className={classes.input}
                  color="secondary"
                />
              );
            })}
          </form>

          <Button
            variant="contained"
            className={classes.btn}
            color="secondary"
            startIcon={<RecordVoiceOver />}
          >
            Generate Note
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default Recording;
