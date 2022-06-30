import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PublishIcon from "@mui/icons-material/Publish";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  Divider,
  Grid,
  Menu,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getUserProfile, putProfile, shortenUrl } from "../api/api";
import AutosaveIndicator from "./AutosaveIndicator";
import FileMenu from "./FileMenu";

export default function SearchAppBar({
  setPresentMode,
  tourName,
  setTourName,
  items,
  saveState,
  user,
  tourUrl,
  setTourUrl,
}) {
  const [anchorElFile, setAnchorElFile] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  // const [queryString, setQueryString] = useState("");
  const [invalidItemsAlert, setInvalidItemsAlert] = useState(false);
  const [invalidText, setInvalidText] = useState("");
  const [copyText, setCopyText] = useState("Copy");
  const [domainUrl, setDomainUrl] = useState("");
  const [loadingUrl, setLoadingUrl] = useState(true);
  const [publishDisabled, setPublishDisabled] = useState(false);
  let params = useParams();
  const tourID = params.tourId;

  useEffect(() => {
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
    fetchProfile();
  }, [user.username]);

  const closeInvalidItemsAlert = () => {
    setInvalidItemsAlert(!invalidItemsAlert);
  };

  const generateQueryString = (items) => {
    let randomID = uuidv4();
    const url = `https://${domainUrl}/${randomID}?`; // previous url: 360-test1.envisage-ar.com
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
    const queryStringUrl = url + queryString

    return {url, queryStringUrl};
  };

  const getShortenedUrl = async (link) => {
    // let encodedLink = encodeURIComponent(link);
    let shortLink = await shortenUrl(link);
    return shortLink;
  };

  const handlePublish = async (event) => {
    const visibleItems = items.filter((item) => item.isVisible === true);
    if (!validateItems(visibleItems)) {
      setInvalidItemsAlert(true);
    } else {
      setAnchorElUser(event.currentTarget);
      const {url, queryStringUrl} = generateQueryString(visibleItems);
      // setQueryString(queryStringRes);
      const shortLink = await getShortenedUrl(
        // queryStringRes.substring(0, queryStringRes.indexOf("?"))
        url
      );
      if (shortLink === null || shortLink === "") {
        alert("Error fetching shortened url from bitly");
        console.log("Error fetching shortened url from bitly");
      }
      setTourUrl(shortLink || "");
      setLoadingUrl(false);
      // disable publish button to avoid spamming to cuttly api
      setPublishDisabled(true);
        setTimeout(() => {
          setPublishDisabled(false);
        }, 10000);
      window.open(queryStringUrl, '_blank', 'noopener,noreferrer')
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setCopyText("copy");
    setLoadingUrl(true);
  };

  const handleOpenFileMenu = (event) => {
    setAnchorElFile(event.currentTarget);
  };

  const handleCloseFileMenu = () => {
    setAnchorElFile(null);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(tourUrl);
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

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{ backgroundColor: "white", color: "black", zIndex: 11 }}
        >
          <Toolbar sx={{ height: "64px" }}>
            <Button
              component={RouterLink}
              to="/"
              size="large"
              startIcon={<ArrowBackIosIcon />}
              sx={{ marginRight: "16px" }}
            >
              Home
            </Button>
            <Button onClick={handleOpenFileMenu} size="large">
              File
            </Button>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-file"
              anchorEl={anchorElFile}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              keepMounted
              open={Boolean(anchorElFile)}
              onClose={handleCloseFileMenu}
            >
              <FileMenu tourName={tourName} items={items} tourUrl={tourUrl} />
            </Menu>
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
                disabled={publishDisabled}
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
                        value={tourUrl}
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
