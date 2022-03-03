import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { textTransform } from "@mui/system";

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#0157FF",
    },
    darkGrey: {
      main: "#18191b",
    },
  },
  typography: {
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
    h3: {
      fontWeight: 500,
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
