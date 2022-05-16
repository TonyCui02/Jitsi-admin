import {
  Alert,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getUserProfile, putProfile } from "../api/api";
import TourCard from "../components/TourCard";

const AccountSettingsView = ({ user }) => {
  const [domainUrl, setDomainUrl] = useState("");
  const [isEditingDomain, setIsEditingDomain] = useState(false);
  const [domainUrlInput, setDomainUrlInput] = useState(domainUrl);

  const handleChange = (event) => {
    setDomainUrlInput(event.target.value);
  };

  const fetchProfile = async () => {
    try {
      const defaultDomain = "https://360-test1.envisage-ar.com";
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

  const changeDomain = async () => {
    try {
      let putProfileRes = await putProfile(user.username, domainUrlInput);
      console.log(putProfileRes);
      setDomainUrl(domainUrlInput);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <Grid container spacing={2} sx={{ maxWidth: "720px" }}>
      <Grid item xs={12}>
        <List>
          <ListItem>
            <Typography sx={{ padding: "16px 0 28px 0" }} variant="h3">
              Your Account
            </Typography>
          </ListItem>
          <Divider />
          <ListItem
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              py: "24px",
            }}
          >
            <Typography gutterBottom variant="h6">
              Email address
            </Typography>
            <Typography variant="body1">{user.attributes.email}</Typography>
          </ListItem>
          <Divider />
          <ListItem
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              py: "24px",
            }}
          >
            <Typography gutterBottom variant="h6">
              Domain url
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginY: "12px"
              }}
            >
              {!isEditingDomain ? (
                <Typography variant="body1">{domainUrl}</Typography>
              ) : (
                <TextField
                  id="outlined-basic"
                  label="Domain url"
                  variant="outlined"
                  size="small"
                  defaultValue={domainUrl}
                  onChange={handleChange}
                  fullWidth
                />
              )}
              <Box display="flex">
                {isEditingDomain && (
                  <Button
                    sx={{ marginX: "6px" }}
                    variant="outlined"
                    onClick={() => {
                      setIsEditingDomain(!isEditingDomain);
                    }}
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  sx={{ marginX: "6px" }}
                  variant="contained"
                  color={isEditingDomain ? "secondary" : "primary"}
                  onClick={() => {
                    !isEditingDomain
                      ? setIsEditingDomain(!isEditingDomain)
                      : changeDomain();
                    setIsEditingDomain(!isEditingDomain);
                  }}
                >
                  {isEditingDomain ? "Save" : "Edit"}
                </Button>
              </Box>
            </Box>
            <Alert variant="outlined" severity="info" sx={{width: "100%"}}>(eg. 360-test1.envisage-ar.com)</Alert>
          </ListItem>
          <Divider />
        </List>
      </Grid>
    </Grid>
  );
};

export default AccountSettingsView;
