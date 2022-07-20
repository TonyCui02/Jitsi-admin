import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useOutletContext } from "react-router-dom";
import TourCard from "../components/TourCard";

const ToursView = ({ tours, deleteTour, deleteDbTour, user }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography px="16px" variant="h3">
          Tours
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" sx={{ flexWrap: "wrap" }}>
          {tours.length > 0 ? (
            tours.map((item) => (
              <TourCard
                key={item.id}
                id={item.id}
                tourName={item.tourName}
                tourPreviewImg={item.tourPreviewImg}
                deleteTour={() => {
                  deleteTour(item.id);
                  deleteDbTour(user.username, item.id);
                }}
                items={item.itemsData}
                tourUrl={item.tourUrl}
                fullUrl={item.fullUrl}
              />
            ))
          ) : (
            <Box px="16px">
              <Typography variant="h6">No tours yet...</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Create a tour to get started
              </Typography>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ToursView;
