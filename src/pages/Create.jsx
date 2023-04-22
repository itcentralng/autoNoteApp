import {
  makeStyles,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  IconButton,
  CardContent,
  Button,
  Card,
  Container,
} from "@material-ui/core";
import {
  AddCircleOutlineOutlined,
  AddCircleOutlineSharp,
  CheckBox,
  CreateRounded,
  NotificationsNone,
  NotificationsNoneOutlined,
  SearchOutlined,
  SubjectOutlined,
} from "@material-ui/icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import React from "react";
import Appdrawer from "../components/Appdrawer";

const drawerWidth = 300;
const useStyles = makeStyles(function (theme) {
  return {
    create: {
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        justifyContent: "space-between",
      },
    },
    drawer: {
      width: drawerWidth,
      color: "red",
    },
    paperDrawer: {
      width: drawerWidth,
      backgroundColor: "gray",
    },

    active: {
      backgroundColor: "black",
    },
    title: {
      padding: theme.spacing(2),
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    topic: {
      fontSize: "1.4rem",
      fontWeight: 400,
      padding: "1.5rem",
      borderBottom: "1px solid black",
      width: "a",
    },
    createContainer: {
      height: "80vh",
      width: `calc(100% - ${drawerWidth}px)`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "3rem",
      [theme.breakpoints.down("sm")]: {
        width: "50%",
        justifyContent: "flex-end",
      },
    },
    card: {
      width: "33.3%",
      height: "15rem",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    cardContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    btn: {
      width: "fit-content",
      padding: "1rem 3rem",
      fontSize: "1.3rem",
      marginTop: "2rem",
    },
  };
});
function Create() {
  let location = useLocation();
  const classes = useStyles();
  return (
    <div className={classes.create}>
      <Appdrawer />
      <Container className={classes.createContainer}>
        <Card className={classes.card} elevation={10}>
          <CardContent className={classes.cardContent}>
            <img src="/Icons/edit.png" width="50rem" height="50rem" alt="" />
            <Link to="/write">
              <Button
                variant="contained"
                color="secondary"
                className={classes.btn}
              >
                Write Note
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className={classes.card} elevation={10}>
          <CardContent className={classes.cardContent}>
            <img src="/Icons/mic.png" width="50rem" height="50rem" alt="" />
            <Link to="/record">
              <Button
                variant="contained"
                color="secondary"
                className={classes.btn}
              >
                Record Audio
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className={classes.card} elevation={10}>
          <CardContent className={classes.cardContent}>
            <img src="/Icons/upload.png" width="50rem" height="50rem" alt="" />
            <Link to="/upload">
              <Button
                variant="contained"
                color="secondary"
                className={classes.btn}
              >
                Upload Audio
              </Button>
            </Link>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default Create;
