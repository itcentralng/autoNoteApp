import React from "react";
import Appdrawer from "../components/Appdrawer";
import { Button, makeStyles } from "@material-ui/core";
import { RecordVoiceOver } from "@material-ui/icons";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => {
  return {
    recording: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
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

  return (
    <div className={classes.recording}>
      <Appdrawer />
      {location.pathname === "/record" ? (
        <Button
          variant="contained"
          className={classes.btn}
          color="secondary"
          startIcon={<RecordVoiceOver />}
        >
          Start Recording
        </Button>
      ) : location.pathname === "/upload" ? (
        <Button
          variant="contained"
          className={classes.btn}
          color="secondary"
          startIcon={<RecordVoiceOver />}
        >
          Upload Recording
        </Button>
      ) : location.pathname === "/write" ? (
        <Button
          variant="contained"
          className={classes.btn}
          color="secondary"
          startIcon={<RecordVoiceOver />}
        >
          Generate Note
        </Button>
      ) : null}
    </div>
  );
}

export default Recording;
