import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import { createTheme } from "@mui/material/styles";

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = createTheme({
  palette: {
    primary: {
      main: "#101010", // Your primary color
      contrastText: "#ffffff", // Text color on primary color
    },
    secondary: {
      main: "#FFF", // Your secondary color
      contrastText: "#ffffff", // Text color on secondary color
    },
    // Define other colors as needed
    background: {
      default: "#f5f5f5", // Default background color
      paper: "#ffffff", // Paper background color
    },
    text: {
      primary: "#333333", // Primary text color
      secondary: "#666666", // Secondary text color
    },
  },
  breakpoints: {
    values: {
      xs: 0, // mobile
      sm: 600, // tablet
      md: 900, // small laptop
      lg: 1200, // desktop
      xl: 1536, // large desktop
    },
  },
  // Optionally define other theme properties
});

root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
