import { useTheme } from "@emotion/react";
import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import MediaCard from "../components/MediaCard";
import MediaCardWrapper from "../components/MediaCardWrapper";
import TopNavbar from "../components/TopNavbar";

const HomePageLayout = () => {
  const theme = useTheme();
  return (
    <Box sx={{ backgroundColor: theme.palette.grey[200] }}>
      <TopNavbar />
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container>
          <Grid item xs={12}>
            <MediaCardWrapper />
          </Grid>
          <Grid item xs={12}>
            <MediaCardWrapper />
          </Grid>
          <Grid item xs={12}>
            <MediaCardWrapper />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePageLayout;
