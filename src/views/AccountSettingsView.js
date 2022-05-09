import {
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
      let profileRes = await getUserProfile(user.username);
      // console.log(profileRes);
      let domain_url = profileRes.domain_url;
      // console.log(domain_url);
      setDomainUrl(domain_url);
    } catch (e) {
      console.log(e);
    }
  };

  const changeDomain = async () => {
    try {
      let putProfileRes = await putProfile(user.username, domainUrlInput);
      console.log(putProfileRes);
      setDomainUrl(domainUrlInput)
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
              }}
            >
              {!isEditingDomain ? (
                <Typography variant="body1">{domainUrl}</Typography>
              ) : (
                <TextField
                  id="outlined-basic"
                  label="Domain url"
                  variant="outlined"
                  defaultValue={domainUrl}
                  onChange={handleChange}
                />
              )}
              <Box>
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
          </ListItem>
          <Divider />
        </List>
      </Grid>
    </Grid>
  );
};

export default AccountSettingsView;
