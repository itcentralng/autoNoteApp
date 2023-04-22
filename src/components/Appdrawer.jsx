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
  DeleteForever,
  NotificationsNone,
  NotificationsNoneOutlined,
  SearchOutlined,
  SubjectOutlined,
} from "@material-ui/icons";
import { Link, useHistory, useLocation, useNavigate } from "react-router-dom";
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
      width: "100%",
    },
    btn: {
      width: "fit-content",
      padding: "1rem 3rem",
      fontSize: "1.3rem",
    },
  };
});
function Appdrawer() {
  const navigate = useNavigate();
  let location = useLocation();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("user"));
  const [subject, setSubject] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/notes`, {
      headers: {
        Authorization: "Bearer " + user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSubject(data);
        localStorage.setItem("subject", JSON.stringify(data));
      });
  }, []);
  useEffect(() => {
    setGroupedData(
      subject.reduce(
        (acc, cur) => {
          const index = acc.findIndex((item) => item.subject === cur.subject);
          if (index !== -1) {
            acc[index].topics.push({
              id: cur.id,
              topic: cur.topic,
              clean: cur.clean,
            });
          } else {
            acc.push({
              subject: cur.subject,
              topics: [{ id: cur.id, topic: cur.topic, clean: cur.clean }],
            });
          }
          return acc;
        },
        [subject]
      )
    );
  }, [subject]);

  function handleDelete(id) {
    fetch(`${process.env.REACT_APP_API_URL}/note/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + user.token,
      },
    });
    let newList = subject.filter((aSubject) => aSubject.id != id);
    setSubject(newList);
  }
  return (
    <div className={classes.create}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.paperDrawer }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" className={classes.title}>
            ClassNaut
          </Typography>
          <Link to="/create">
            <Button
              className={classes.btn}
              variant="contained"
              color="secondary"
            >
              CREATE NOTE
            </Button>
          </Link>
        </div>
        <List style={{ width: "100%" }}>
          {groupedData?.map(function (subject) {
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
                  <List style={{ width: "100%" }}>
                    {subject?.topics?.map((topic) => {
                      return (
                        <div style={{ display: "flex" }}>
                          <ListItem
                            fullWidth
                            className={classes.topic}
                            onClick={() => {
                              console.log("clicked");
                              // window.location.reload();
                              // localStorage.setItem("topicId", topic.id);
                              navigate(`/generator/${topic.id}`);
                            }}
                          >
                            {topic.topic}
                          </ListItem>
                          <IconButton
                            onClick={() => {
                              handleDelete(topic.id);
                            }}
                          >
                            <DeleteForever />
                          </IconButton>
                        </div>
                      );
                    })}
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
