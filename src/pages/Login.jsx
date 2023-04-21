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
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState("");
  const [authToken, setAuthToken] = useState("");
  const navigate = useNavigate(); 
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.klassnote.itcentral.ng/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password }),
      });
      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem("authToken", data.token);
        setAuthToken(data.token);
        console.log("User token:", data.token);
        setLoginMessage("Logged in successfully");
        navigate("/create"); // Navigate to /generate page
      } else {
        setLoginMessage("Wrong username or password");
      }
    } catch (error) {
      console.error('Failed to login user:', error);
      setLoginMessage("Wrong username or password");
    }
  };
  
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
            <form onSubmit={handleSubmit}>
            <FormControl>
            <FormGroup>
            <TextField
              variant="outlined"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              InputLabelProps={{
                style: {
                  color: "black",
                },
              }}
              className={classes.input}
              color="secondary"
            />
            
              <Button
                variant="contained"
                type="submit"
                color="secondary"
                className={classes.btn}
              >
                Log in
              </Button>
              {loginMessage && <div style={{ color: "red", fontSize:14 }}>{loginMessage}</div>}
              </FormGroup>
            </FormControl>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default Login;