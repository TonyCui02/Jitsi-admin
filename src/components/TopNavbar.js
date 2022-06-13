import { useTheme } from "@emotion/react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PublishIcon from "@mui/icons-material/Publish";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import {
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  Dialog,
  Divider,
  Grid,
  Icon,
  Menu,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { getUserProfile, putProfile, shortenUrl } from "../api/api";
import AutosaveIndicator from "./AutosaveIndicator";
import { v4 as uuidv4 } from "uuid";

export default function SearchAppBar({
  setPresentMode,
  tourName,
  setTourName,
  items,
  saveState,
  user,
}) {
  const theme = useTheme();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [queryString, setQueryString] = useState("");
  const [invalidItemsAlert, setInvalidItemsAlert] = useState(false);
  const [invalidText, setInvalidText] = useState("");
  const [copyText, setCopyText] = useState("Copy");
  const [domainUrl, setDomainUrl] = useState("");
  const [loadingUrl, setLoadingUrl] = useState(true);

  const fetchProfile = async () => {
    try {
      const defaultDomain = "360-test1.envisage-ar.com";
      let profileRes = await getUserProfile(user.username);
      // console.log(profileRes);
      let domain_url = profileRes.domain_url;
      // console.log(domain_url);
      if (
        domain_url === undefined ||
        domain_url === null ||
        domain_url === ""
      ) {
        putProfile(user.username, defaultDomain);
        setDomainUrl(defaultDomain);
      } else {
        setDomainUrl(domain_url);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const closeInvalidItemsAlert = () => {
    setInvalidItemsAlert(!invalidItemsAlert);
  };

  const generateQueryString = (items) => {
    let randomID = uuidv4();
    let url = `https://${domainUrl}/${randomID}?`; // previous url: 360-test1.envisage-ar.com
    let queryStringArr = [];
    for (let i = 0; i < items.length; i++) {
      queryStringArr.push(
        `image[${i}][name]=` + encodeURIComponent(items[i].title)
      );
      queryStringArr.push(
        `image[${i}][src]=` + encodeURIComponent(items[i].imgUrl)
      );
    }
    let queryString = queryStringArr.join("&");

    return url + queryString;
  };

  const getShortenedUrl = async (link) => {
    // let encodedLink = encodeURIComponent(link)
    let shortLink = await shortenUrl(link);
    return shortLink;
  };

  const handlePublish = async (event) => {
    const visibleItems = items.filter((item) => item.isVisible === true);
    if (!validateItems(visibleItems)) {
      setInvalidItemsAlert(true);
    } else {
      setAnchorElUser(event.currentTarget);
      let queryStringRes = generateQueryString(visibleItems);
      // setQueryString(queryStringRes);
      const shortLink = await getShortenedUrl(
        // queryStringRes.substring(0, queryStringRes.indexOf("?"))
        queryStringRes
      );
      // console.log(queryStringRes);
      // console.log(shortLink);
      if (shortLink === null || shortLink === "") {
        alert("Error fetching shortened url from bitly");
        console.log("Error fetching shortened url from bitly");
      }
      setQueryString(shortLink || "");
      setLoadingUrl(false);
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setCopyText("copy");
    setLoadingUrl(true);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(queryString);
    setCopyText("Copied");
  };

  const validateItems = (items) => {
    if (items.length <= 0) {
      setInvalidText(`Oops, you need at least one media to upload`);
      return false;
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (
        item.imgUrl === "" ||
        item.imgUrl === null ||
        item.title === "" ||
        item.title === null
      ) {
        setInvalidText(`There are item(s) with missing title or 
        image/video`);
        return false;
      }
    }
    return true;
  };

  // const handleDebounceFn = (input) => {
  //   console.log(input);
  // };

  // const debounceFn = useCallback(debounce(handleDebounceFn, 1000), []);

  // const updateTourName = (e) => {
  //   setTourName(e.target.value);
  //   debounceFn(e.target.value);
  // };

  // const debouncedTourName = debounce(updateTourName, 100);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{ backgroundColor: "white", color: "black", zIndex: 11 }}
        >
          <Toolbar sx={{ height: "64px" }}>
            <Button
              component={RouterLink}
              to="/"
              size="large"
              startIcon={<ArrowBackIosIcon />}
            >
              Home
            </Button>
            <AutosaveIndicator saving={saveState} />
            <Box sx={{ flexGrow: 1 }} />
            <Box
              sx={{
                display: { md: "flex" },
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
                    {loadingUrl ? (
                      <Skeleton />
                    ) : (
                      <Typography gutterBottom variant="subtitle1">
                        Generated link
                      </Typography>
                    )}
                  </Grid>
                  <Divider sx={{ width: "100%" }} />
                  <Grid item xs={12}>
                    {loadingUrl ? (
                      <Skeleton />
                    ) : (
                      <Typography variant="body2">
                        Paste the link into your browser to start a new meeting
                        in Jitsi
                        <br></br>
                        <strong>
                          (Your notes will not be uploaded to Jitsi)
                        </strong>
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={9}>
                    {loadingUrl ? (
                      <Skeleton />
                    ) : (
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
                    )}
                  </Grid>
                  <Grid item sx={{ display: "flex" }} xs={3}>
                    {loadingUrl ? null : (
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => handleCopyClick()}
                      >
                        {copyText}
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </Box>
      <Dialog open={invalidItemsAlert} onClose={closeInvalidItemsAlert}>
        <Alert
          severity="warning"
          role="button"
          onClose={() => closeInvalidItemsAlert()}
          closeText="Close"
        >
          <AlertTitle>Invalid items</AlertTitle>
          {invalidText}
        </Alert>
      </Dialog>
    </>
  );
}
