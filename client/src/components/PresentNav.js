import { useTheme } from "@emotion/react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";

export default function PresentNav({ setPresentMode, drawerWidth }) {
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      sx={{
        background: "transparent",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ height: "64px" }}>
        <Button size="large" startIcon={<ArrowBackIosIcon />}>
          Home
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 1,
            alignItems: "center",
          }}
        >
          {/* <TextField
            hiddenLabel
            size="small"
            label="Tour name"
            id="outlined-size-normal"
          />
          <Box sx={{ width: 5 }} />
          <Button sx={{ height: 40 }} variant="outlined">
            Present
          </Button>
          <Button sx={{ height: 40 }} variant="contained">
            Publish
          </Button> */}
          <IconButton
            //   size="large"
            sx={{ position: "absolute", top: "14px", right: "14px" }}
            aria-label="close"
            onClick={() => setPresentMode(false)}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
