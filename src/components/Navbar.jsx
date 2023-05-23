import {
  Container,
  List,
  ListItem,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => {
  return {
    logo: {
      [theme.breakpoints.down("sm")]: {
        color: "black",
        fontSize: "3rem",
        zIndex: 2,
        position: "absolute",
        top: 15,
        left: 10,
      },
    },
    navbarContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: "8rem",
    },
    navItems: {
      display: "flex",
      width: "50%",
      justifyContent: "space-between",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    navItem: {
      fontSize: "1.2rem",
      cursor: "pointer",
      fontWeight: 600,
    },
  };
});
function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
  }

  const navItems = [
    {
      title: "About",
      Link: "/about",
    },
    {
      title: "Tutorial",
      Link: "/tutorial",
    },
    {
      title: "Contact Us",
      Link: "/contact",
    },
    {
      title: "Register",
      Link: "/register",
    },
    isLoggedIn
      ? {
          title: "Logout",
          Link: "#",
          onclick: handleLogout,
        }
      : {
          title: "Log in",
          Link: "/teacher",
          onclick: handleLogin,
        },
  ];

  const classes = useStyles();
  return (
    <div className={classes.navbar}>
      <Container className={classes.navbarContainer}>
        <div className={classes.logo}>
          <Link to="/">
            <Typography variant="h4">CourseGuide</Typography>
          </Link>
        </div>
        <List className={classes.navItems}>
          {navItems.map((navItem) => {
            return (
              <Link to={navItem.Link} className={classes.navItem}>
                <ListItem key={navItem.title}>{navItem.title}</ListItem>
              </Link>
            );
          })}
        </List>
      </Container>
    </div>
  );
}

export default Navbar;
