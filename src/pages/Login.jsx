import {
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  makeStyles,
  FormControl,
  FormGroup
} from "@material-ui/core";
import { LocalSeeRounded } from "@material-ui/icons";
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
      marginTop: "1rem",
    },
    input: {
      color: "red",
      marginBottom: "16px",
    },
  };
});
function Login() {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/create");
    }
  }, []);

  // console.log(location.pathname);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleLogin() {
    fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      res.json().then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/create");
        }
      });
    });
  }
  function checkTokenExpiration() {
    const token = localStorage.getItem("token");
    if (token) {
      const { exp } = JSON.parse(atob(token.split(".")[1])); // parse the expiration time from the token payload
      if (Date.now() >= exp * 1000) {
        // token has expired, redirect to login page
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    }
  }

  checkTokenExpiration();
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
            <form onSubmit={handleSubmit}>
            <FormControl>
            <FormGroup>
            <TextField
              variant="outlined"
              label="Username"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              InputLabelProps={{
                style: {
                  color: "black", marginBottom: '16px'
                },
              }}
              className={classes.input}
              color="secondary"
            />

            <TextField
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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