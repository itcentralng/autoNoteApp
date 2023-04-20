import {
  Container,
  List,
  ListItem,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => {
  return {
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
    {
      title: "Log in",
      Link: "/login",
    },
  ];
  const classes = useStyles();
  return (
    <div className={classes.navbar}>
      <Container className={classes.navbarContainer}>
        <div className={classes.logo}>
          <Link to="/">
            <Typography variant="h4">ClassNaut</Typography>
          </Link>
        </div>
        <List className={classes.navItems}>
          {navItems.map((navItem) => {
            return (
              <ListItem key={navItem.title} className={classes.navItem}>
                {navItem.title}
              </ListItem>
            );
          })}
        </List>
      </Container>
    </div>
  );
}

export default Navbar;
