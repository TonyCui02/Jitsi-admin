import { ThemeProvider, useTheme } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import PresentDrawer from "../components/PresentDrawer";
import PresentNav from "../components/PresentNav";
import SlidesPreview from "../components/SlidesPreview";
import { darkTheme } from "../themes";

export const defaultDrawerWidth = 360;
const minDrawerWidth = 260;
const maxDrawerWidth = 1000;


const PresentView = ({ setPresentMode, items, updateItem }) => {
  const theme = useTheme();

  const [drawerWidth, setDrawerWidth] = useState(defaultDrawerWidth);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          display: "flex",
          backgroundColor: theme.palette.darkGrey.main,
        }}
      >
        <CssBaseline />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: `calc(100% - ${drawerWidth}px)`,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <PresentNav setPresentMode={setPresentMode} />
          <SlidesPreview items={items} setActiveIndex={setActiveIndex} />
        </Box>
        <PresentDrawer
          drawerWidth={drawerWidth}
          setDrawerWidth={setDrawerWidth}
          activeItem={items[activeIndex]}
          updateItem={updateItem}
        />
      </Box>
    </ThemeProvider>
  );
};

export default PresentView;
