import {
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => {
  return {
    loginContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    card: {
      width: "50%",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    btn: {
      width: "fit-content",
      padding: "1rem 3rem",
      fontSize: "1.3rem",
      marginTop: "2rem",
    },
    input: {
      color: "red",
    },
  };
});
function Login() {
  const classes = useStyles();
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className={classes.login}>
      <Container className={classes.loginContainer}>
        <Card className={classes.card} elevation={10}>
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "3rem",
              width: "100%",
            }}
          >
            <img
              src={
                location.pathname == "/teacher"
                  ? "/Images/teacherImage.jpg"
                  : "/Images/studentImage.jpg"
              }
              height="200rem"
              width="200rem"
              alt=""
            />
            <Typography variant="h3">
              {location.pathname == "/teacher" ? "Teacher" : "Student"}
            </Typography>
            <TextField
              variant="outlined"
              label="Username"
              InputLabelProps={{
                style: {
                  color: "black",
                },
              }}
              className={classes.input}
              color="secondary"
            />
            <TextField
              variant="outlined"
              label="Password"
              InputLabelProps={{
                style: {
                  color: "black",
                },
              }}
              className={classes.input}
              color="secondary"
            />
            <Link to={location.pathname === "/teacher" ? "/subject" : null}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.btn}
              >
                Log in
              </Button>
            </Link>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default Login;
