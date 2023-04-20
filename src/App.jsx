import { ThemeProvider, createTheme } from "@material-ui/core";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Question from "./pages/Questions";
import Questions from "./pages/Questions";
import Create from "./pages/Create";
import Recording from "./pages/Recording";
import Generator from "./pages/Generator";
const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#090E16",
      light: "#7B4AE2",
      dark: "#090E16",
    },
    success: {
      main: "#4AE290",
    },
  },
  typography: {
    fontFamily: "Poppins",
    h1: {
      fontWeight: 700,
      fontSize: "5rem",
      textAlign: "left",
      "@media (max-width:959.95px)": {
        fontSize: "4rem",
        textAlign: "left",
      },
    },
    h2: {
      fontWeight: 500,
      fontSize: "6rem",
      background: "transparent",
      color: "white",
      "@media (max-width:959.95px)": {
        fontSize: "3rem",
      },
    },
    h4: {
      fontWeight: 600,
    },
    body1: {
      fontSize: "2rem",
      textAlign: "center",
      background: "transparent",
      color: "white",
      "@media (max-width:959.95px)": {
        fontSize: "1.4rem",
        textAlign: "left",
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Hero />} />
            <Route exact path="/teacher" element={<Login />} />
            <Route exact path="/student" element={<Login />} />
            <Route
              exact
              path="/subject"
              element={<Questions question="What is the subject" />}
            />
            <Route
              exact
              path="/topic"
              element={<Questions question="What is the topic" />}
            />
            <Route
              exact
              path="/level"
              element={<Questions question="What is the level" />}
            />
            <Route exact path="/create" element={<Create />} />
            <Route exact path="/record" element={<Recording />} />
            <Route exact path="/upload" element={<Recording />} />
            <Route exact path="/write" element={<Recording />} />
            <Route exact path="/generate" element={<Generator />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
