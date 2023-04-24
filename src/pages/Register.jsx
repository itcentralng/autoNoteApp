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
function Register() {
  const classes = useStyles();
  const location = useLocation();
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [RegisterMessage, setRegisterMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://api.klassnote.itcentral.ng/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      setRegisterMessage("User registered successfully");
      console.log("User registered successfully:", data);
    } catch (error) {
      console.error("Failed to register user:", error);
      setRegisterMessage("Failed to register user");
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
              src={"/Images/teacherImage.jpg"}
              height="200rem"
              width="200rem"
              alt=""
            />
            <Typography variant="h3">Teacher</Typography>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "3rem",
              }}
            >
              <TextField
                variant="outlined"
                label="Email"
                value={email}
                onChange={(e) => setUsername(e.target.value)}
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
                Register
              </Button>
              {RegisterMessage && (
                <div style={{ color: "red", fontSize: 14 }}>
                  {RegisterMessage}
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default Register;
