import React from "react";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import { Box, Typography } from "@mui/material";
import SavingState from "./SavingState";

const AutosaveIndicator = ({ saving }) => {
  let display;
  switch (saving) {
    default:
      display = "All changes saved.";
      break;
    case SavingState.NOT_SAVED:
      display = "Unsaved changes.";
      break;
    case SavingState.SAVING:
      display = "Saving...";
      break;
    case SavingState.SAVED:
      display = "All changes saved.";
      break;
  }
  return (
    <Box sx={{ display: "flex", alignItems: "center", mx: "32px" }}>
      {saving === SavingState.SAVED ? (
        <CloudDoneIcon color="primary" />
      ) : (
        <CloudSyncIcon color="primary" />
      )}
      <Typography variant="subtitle2" color="text.secondary" sx={{ px: "8px" }}>
        {display}
      </Typography>
    </Box>
  );
};

export default AutosaveIndicator;
