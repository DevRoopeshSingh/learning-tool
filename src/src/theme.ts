import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f3ec78",
      contrastText: "#000",
    },
    secondary: {
      main: "#af4261",
      contrastText: "#fff",
    },
    success: {
      main: "#66bb6a",
      contrastText: "#fff",
    },
    error: {
      main: "#ef5350",
      contrastText: "#fff",
    },
    background: {
      default: "#f0f8ff",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Comic Sans MS, Comic Sans, cursive",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
