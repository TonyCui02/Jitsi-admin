import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useTheme } from "@emotion/react";
import { Card, CardActionArea, Icon, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UploaderBox = () => {
  const theme = useTheme();
  return (
    <CardActionArea
      onClick={() => alert("test")}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        height: 374,
        margin: "0px 25px 0px 0px",
        flex: "1",
        cursor: "pointer",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexFlow: "column",
          backgroundColor: theme.palette.grey[200],
          border: "2px dashed",
          borderColor: theme.palette.grey[400],
          boxShadow: `0 0 0 12px ${theme.palette.grey[200]}`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 20,
            gap: "10px",
          }}
        >
          <CloudUploadIcon fontSize="large" />
          <Typography variant="body1" sx={{ width: 140, textAlign: "center" }}>
            Drag and drop or click to upload
          </Typography>
        </Box>
        <Typography
          sx={{ flexGrow: 1, color: "text.secondary" }}
          variant="caption"
        >
          Supports 360 images and videos
        </Typography>
      </Paper>
    </CardActionArea>
  );
};

export default UploaderBox;
