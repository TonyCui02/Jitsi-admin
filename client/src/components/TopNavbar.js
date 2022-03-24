import { useTheme } from "@emotion/react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Alert,
  AlertTitle,
  Button,
  Card,
  Container,
  Dialog,
  Divider,
  Grid,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import PublishIcon from "@mui/icons-material/Publish";
import { useState } from "react";

export default function SearchAppBar({
  setPresentMode,
  tourName,
  setTourName,
  items,
}) {
  const theme = useTheme();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [queryString, setQueryString] = useState("");
  const [invalidItemsAlert, setInvalidItemsAlert] = useState(false);
  const [copyText, setCopyText] = useState("Copy");

  const closeInvalidItemsAlert = () => {
    setInvalidItemsAlert(!invalidItemsAlert);
  };

  const handlePublish = (event) => {
    if (!validateItems(items)) {
      setInvalidItemsAlert(true);
    } else {
      setQueryString(generateQueryString(items));
      setAnchorElUser(event.currentTarget);
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setCopyText("copy");
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(queryString);
    setCopyText("Copied");
  };

  const generateQueryString = (items) => {
    let randomID = crypto.randomUUID();
    let url = `https://360-test1.envisage-ar.com/${randomID}?`;
    let queryStringArr = [];
    const visibleItems = items.filter((item) => item.isVisible === true);
    for (let i = 0; i < visibleItems.length; i++) {
      // queryString += `image[${i}][name]=${visibleItems[i].title}&image[${i}][src]=${visibleItems[i].imgUrl}`
      // if (i !== items.length - 1) {
      //   queryString += "&";
      // }
      queryStringArr.push(
        `image[${i}][name]=` + encodeURIComponent(visibleItems[i].title)
      );
      queryStringArr.push(
        `image[${i}][src]=` + encodeURIComponent(visibleItems[i].imgUrl)
      );
    }
    let queryString = queryStringArr.join("&");

    return url + queryString;
  };

  const validateItems = (items) => {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.imgUrl === "" || item.imgUrl === null) {
        return false;
      } else if (item.title === "" || item.title === null) {
        return false;
      }
    }
    return true;
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{ backgroundColor: "white", color: "black" }}
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
              <TextField
                hiddenLabel
                size="small"
                label="Tour name"
                id="outlined-size-normal"
                value={tourName || ""}
                onChange={(e) => setTourName(e.target.value)}
              />
              <Box sx={{ width: 5 }} />
              <Button
                sx={{ height: 40 }}
                variant="outlined"
                onClick={() => setPresentMode(true)}
                startIcon={<SlideshowIcon />}
              >
                Present
              </Button>
              <Button
                sx={{ height: 40 }}
                variant="contained"
                onClick={handlePublish}
                startIcon={<PublishIcon />}
              >
                Publish
              </Button>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Grid
                  container
                  spacing={2}
                  sx={{ width: "400px", py: "16px", px: "16px" }}
                >
                  <Grid item xs={12}>
                    <Typography gutterBottom variant="subtitle1">
                      Generated query string
                    </Typography>
                  </Grid>
                  <Divider sx={{ width: "100%" }} />
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      Add the generated query string to the end of your Jitsi
                      360 meeting url to publish your tour to Jitsi.
                      <br></br>
                      <strong>
                        (Your notes will not be uploaded to Jitsi)
                      </strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      fullWidth
                      hiddenLabel
                      size="small"
                      id="outlined-read-only-input"
                      // label="Read Only"
                      value={queryString}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item sx={{ display: "flex" }} xs={3}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => handleCopyClick()}
                    >
                      {copyText}
                    </Button>
                  </Grid>
                </Grid>
              </Menu>
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
      <Dialog open={invalidItemsAlert} onClose={closeInvalidItemsAlert}>
        <Alert
          severity="warning"
          role="button"
          onClose={() => closeInvalidItemsAlert()}
          closeText="Doesn't Work!"
        >
          <AlertTitle>Invalid items</AlertTitle>
          There are item(s) with missing <strong>title</strong> or{" "}
          <strong>image/video</strong>
        </Alert>
      </Dialog>
    </>
  );
}
