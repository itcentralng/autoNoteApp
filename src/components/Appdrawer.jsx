import {
  makeStyles,
  Drawer,
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
import { useHistory, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

const drawerWidth = 300;
const useStyles = makeStyles(function (theme) {
  return {
    create: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
      overflowX: "hidden",
      [theme.breakpoints.down("sm")]: {
        width: "50%",
      },
      "@media print": {
        display: "none",
      },
    },
    paperDrawer: {
      width: drawerWidth,
      backgroundColor: "gray",
      overflowX: "hidden",

      [theme.breakpoints.down("sm")]: {
        width: "50%",
      },
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
      width: "100vw",
    },
  };
});
function Appdrawer() {
  let location = useLocation();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("user"));
  const [subject, setSubject] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/notes`, {
      headers: {
        Authorization: "Bearer " + user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSubject(
          data.map((aData) => {
            return aData;
          })
        );
      });
  }, []);
  const groupedData = subject.reduce((acc, cur) => {
    const index = acc.findIndex((item) => item.subject === cur.subject);
    if (index !== -1) {
      acc[index].topics.push(cur.topic);
    } else {
      acc.push({ subject: cur.subject, topics: [cur.topic] });
    }
    return acc;
  }, []);

  return (
    <div className={classes.create}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.paperDrawer }}
      >
        <Typography variant="h4" className={classes.title}>
          ClassNaut
        </Typography>
        <List>
          {groupedData.map(function (subject) {
            return (
              <Accordion>
                <AccordionSummary
                  //   expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography color="secondary" variant="h4">
                    {subject.subject}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  style={{
                    padding: 0,
                    backgroundColor: "whitesmoke",
                  }}
                >
                  <List>
                    {subject.topics.map((topic) => {
                      return (
                        <ListItem className={classes.topic}>{topic}</ListItem>
                      );
                    })}

                    {/* <TextField
                      label="Add a new topic"
                      color="secondary"
                      style={{
                        padding: "1rem",
                      }}
                      //   fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton>
                              <AddCircleOutlineOutlined color="danger" />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      InputLabelProps={{
                        style: {
                          color: "black",
                          padding: "1rem",
                          fontSize: "1.4rem",
                        },
                      }}
                    /> */}
                  </List>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
}

export default Appdrawer;
