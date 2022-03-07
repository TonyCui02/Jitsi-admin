import { useTheme } from "@emotion/react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";

export default function SearchAppBar({ setPresentMode }) {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", color: "black" }}
      >
        <Toolbar sx={{ height: "64px" }}>
          {/* <Button size="large" startIcon={<ArrowBackIosIcon />}>
            Home
          </Button> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            <TextField
              hiddenLabel
              size="small"
              label="Tour name"
              id="outlined-size-normal"
            />
            <Box sx={{ width: 5 }} />
            <Button
              sx={{ height: 40 }}
              variant="outlined"
              onClick={() => setPresentMode(true)}
            >
              Present
            </Button>
            <Button sx={{ height: 40 }} variant="contained">
              Publish
            </Button>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <KeyboardArrowDownIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
