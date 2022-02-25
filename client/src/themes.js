import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { textTransform } from "@mui/system";

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#0157FF",
    },
  },
  typography: {
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
