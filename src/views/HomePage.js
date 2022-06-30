import AddCircleIcon from "@mui/icons-material/AddCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Alert,
  AlertTitle,
  AppBar,
  Avatar,
  Button,
  Dialog,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useState } from "react";
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
  useResolvedPath,
  Link as RouterLink,
  matchPath,
} from "react-router-dom";
import TourCard from "../components/TourCard";
import { getUserTours, putTour, delTour } from "../api/api";
import ToursView from "./ToursView";
import AccountSettingsView from "./AccountSettingsView";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { v4 as uuidv4 } from "uuid";
import { Auth } from "aws-amplify";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";

const drawerWidth = 240;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function useRouteMatch(patterns) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

const HomePage = ({ user, signOut }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElTour, setAnchorElTour] = useState(null);
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [tours, setTours] = useState(null);
  const [createdTour, setCreatedTour] = useState(null);
  const [toursExceededAlert, setToursExceededAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let navigate = useNavigate();
  const routeMatch = useRouteMatch(["/settings", "/"]);
  const currentTab = routeMatch?.pattern?.path;

  console.log(currentTab);

  const openCreateTourMenu = (event) => {
    setAnchorElTour(event.currentTarget);
  };

  const closeCreateTourMenu = () => {
    setAnchorElTour(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleToursExceededAlert = () => {
    setToursExceededAlert(!toursExceededAlert);
  };

  const tourLimitExceeded = () => {
    const numTours = tours.length;
    // console.log(numTours);
    if (numTours >= 10) {
      toggleToursExceededAlert();
      return true;
    }
    return false;
  };

  const createTour = async () => {
    // if (tourLimitExceeded() === true) {
    //   return;
    // }
    const tourID = uuidv4();
    const tourName = "Untitled Tour";
    const tourPreviewImg = "";
    const itemsData = [];
    itemsData[0] = {
      imgUrl: "",
      title: "",
      description: "",
      mediaType: "image",
      isVisible: true,
    };
    let newTour = {
      id: tourID,
      tourName: tourName,
      tourPreviewImg: tourPreviewImg,
      itemsData: itemsData,
    };
    if (
      user.username !== undefined &&
      user.username !== null &&
      user.username !== ""
    ) {
      const putTourRes = await putTour(
        user.username,
        tourID,
        itemsData,
        tourName,
        tourPreviewImg
      );
      // console.log(putTourRes.success);
      if (putTourRes.success === "put call succeed!") {
        setTours([...tours, newTour]);
        setCreatedTour(newTour);
      }
    }
  };

  const deleteTour = useCallback((id) => {
    setTours((prevItems) => prevItems.filter((item, index) => item.id !== id));
  }, []); // No dependencies

  const deleteDbTour = async (username, tourId) => {
    const deleteTourRes = await delTour(username, tourId);
    console.log(deleteTourRes);
  };

  const fetchUserTours = async () => {
    try {
      const userToursRes = await getUserTours(user.username);
      let fetchedTourData = userToursRes.map((item) => ({
        id: item.SK.replace("tour_", ""),
        tourName: item.tourName,
        tourPreviewImg: item.tourPreviewImg || "",
        itemsData: item.tourData || null,
        tourUrl: item.tourUrl,
      }));
      console.log(userToursRes);
      console.log(fetchedTourData);
      setTours(fetchedTourData);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("mount");
    fetchUserTours();
  }, []);
  useEffect(() => {
  }, [tours]);
  useEffect(() => {
    if (createdTour) {
      navigate(`/tours/${createdTour.id}`);
    }
  }, [createdTour, navigate]);

  if (loading) return <LoadingPage />;
  if (error || tours === null) return <ErrorPage />;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          color: "black",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            height: "64px",
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h5"
            color="primary"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Jitsi360 Admin
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", gap: "18px" }}>
            <Button
              sx={{ height: 40 }}
              variant="contained"
              onClick={openCreateTourMenu}
            >
              Create A Tour
            </Button>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElTour}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElTour)}
              onClose={closeCreateTourMenu}
            >
              <MenuItem
                onClick={() => {
                  createTour();
                  closeCreateTourMenu();
                }}
                disabled={createdTour !== null}
              >
                <ListItemIcon>
                  <AddCircleIcon />
                </ListItemIcon>
                <ListItemText>New</ListItemText>
              </MenuItem>
              {/* <MenuItem onClick={closeCreateTourMenu}>
                <ListItemIcon>
                  <ContentCopyIcon />
                </ListItemIcon>
                <ListItemText>Duplicate Existing</ListItemText>
              </MenuItem> */}
            </Menu>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" />
              </IconButton>
            </Tooltip>
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
              <MenuItem
                // component={RouterLink}
                // to="/settings"
                onClick={() => {
                  handleCloseUserMenu();
                  navigate("settings");
                }}
              >
                <Typography textAlign="center">Account Settings</Typography>
              </MenuItem>
              <MenuItem onClick={() => Auth.signOut()}>
                <Typography textAlign="center">Sign Out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Dialog open={toursExceededAlert} onClose={toggleToursExceededAlert}>
        <Alert
          severity="warning"
          role="button"
          onClose={() => toggleToursExceededAlert()}
          closeText="Close"
        >
          <AlertTitle>Cannot create tour</AlertTitle>
          you have reached the maximum limit of 10 tours
        </Alert>
      </Dialog>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem
              component={RouterLink}
              selected={currentTab === "/"}
              button
              to="/"
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem
              component={RouterLink}
              selected={currentTab === "/settings"}
              button
              to="settings"
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Account Settings" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Main open={open} sx={{ height: "100vh" }}>
        <DrawerHeader />
        <Routes>
          <Route
            path="/"
            element={
              <ToursView
                tours={tours}
                deleteTour={deleteTour}
                deleteDbTour={deleteDbTour}
                user={user}
              />
            }
          ></Route>
          <Route
            path="settings"
            element={<AccountSettingsView user={user} />}
          />
        </Routes>
        <Outlet />
      </Main>
    </Box>
  );
};

export default HomePage;
