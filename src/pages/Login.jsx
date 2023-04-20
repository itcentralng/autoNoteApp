import {
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

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
  const navigate = useNavigate();

  console.log(location.pathname);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleLogin() {
    if (location.pathname === "/teacher") {
      fetch("https://api.klassnote.itcentral.ng/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }).then((res) => {
        if (res.ok) {
          console.log("good");
          navigate("/subject");
        } else {
          console.log("bad");
        }
      });
    } else {
      console.log("this is for student ");
    }
  }
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
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              InputLabelProps={{
                style: {
                  color: "black",
                },
              }}
              className={classes.input}
              color="secondary"
            />
            {/* <Link to={location.pathname === "/teacher" ? "/subject" : null}> */}
            <Button
              variant="contained"
              color="secondary"
              className={classes.btn}
              onClick={handleLogin}
            >
              Log in
            </Button>
            {/* </Link> */}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default Login;
