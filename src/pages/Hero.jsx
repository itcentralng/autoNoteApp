import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Height } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => {
  return {
    heroContainer: {
      height: "auto",
      display: "flex",
      alignItems: "center",
    },
    btn: {
      width: "fit-content",
      padding: "1rem 3rem",
      fontSize: "1.3rem",
      marginTop: "2rem",
    },
    heroWriting: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    loginCards: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",

      gap: "3rem",
      marginBottom: "2rem",
    },
    card: {
      width: "33.3%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
  };
});
function Hero() {
  const classes = useStyles();
  return (
    <div className={classes.hero}>
      <Container className={classes.heroContainer}>
        <Grid container>
          <Grid item md={6} sm={12} xs={12} className={classes.heroWriting}>
            <Typography variant="h1">
              A note-taking app specifically designed for teachers and students
            </Typography>
            <Link to="/register">
            <Button
              className={classes.btn}
              variant="contained"
              color="secondary"
            >
              Get started
            </Button>
            </Link>
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <img
              src="/Images/heroImage.jpg"
              width="100%"
              height="100%"
              alt=""
            />
          </Grid>
        </Grid>
      </Container>
      <div>
        <Container className={classes.loginCards}>
          <Card className={classes.card} elevation={10}>
            <CardContent>
              <img
                src="/Images/teacherImage.jpg"
                width="100rem"
                height="100rem"
                alt=""
              />
              <Typography variant="h3">Teacher</Typography>
              <Link to="/teacher">
                {" "}
                <Button
                  variant="contained"
                  className={classes.btn}
                  color="secondary"
                >
                  Log in
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card className={classes.card} elevation={10}>
            <CardContent>
              <img
                src="/Images/studentImage.jpg"
                width="100rem"
                height="100rem"
                alt=""
              />
              <Typography variant="h3">Student</Typography>

              <Link to="/student">
                {" "}
                <Button
                  variant="contained"
                  className={classes.btn}
                  color="secondary"
                >
                  Log in
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default Hero;
