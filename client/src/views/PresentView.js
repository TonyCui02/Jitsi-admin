import { ThemeProvider, useTheme } from "@emotion/react";
import { CssBaseline, Drawer } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import PresentDrawer from "../components/PresentDrawer";
import PresentNav from "../components/PresentNav";
import SlidesPreview from "../components/SlidesPreview";
import { darkTheme } from "../themes";

const PresentView = ({ setPresentMode }) => {
  const theme = useTheme();

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          color: "white",
        }}
      >
        <CssBaseline />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: theme.palette.darkGrey.main }}
        >
          <PresentNav setPresentMode={setPresentMode} />
        </Box>
        <PresentDrawer />
      </Box>
    </ThemeProvider>
  );
};

export default PresentView;
