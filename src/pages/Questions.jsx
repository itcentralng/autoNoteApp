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
    question: {
      height: "80vh",
    },
    questionContainer: {
      height: "100%",
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
function Questions(props) {
  const classes = useStyles();
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className={classes.question}>
      <Container className={classes.questionContainer}>
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
            <Typography variant="h3">{props.question}</Typography>
            <TextField
              variant="outlined"
              InputLabelProps={{
                style: {
                  color: "black",
                },
              }}
              className={classes.input}
              color="secondary"
            />
            <Link
              to={
                location.pathname === "/subject"
                  ? "/topic"
                  : location.pathname === "/topic"
                  ? "/level"
                  : location.pathname === "/level"
                  ? "/create"
                  : null
              }
            >
              <Button
                variant="contained"
                color="secondary"
                className={classes.btn}
              >
                Next
              </Button>
            </Link>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default Questions;
