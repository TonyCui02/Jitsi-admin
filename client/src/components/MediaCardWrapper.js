import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton, Toolbar, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import MediaCard from "./MediaCard";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

const CardHelpers = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  padding: "6px 0px 6px 0px",
}));

const MediaCardWrapper = () => {
  return (
    <Box sx={{ paddingTop: "26px" }}>
      <CardHelpers>
        <Typography>Item 1</Typography>
        <IconButton>
          <VisibilityOutlinedIcon />
        </IconButton>
        <Box sx={{ flex: "1" }} />
        <IconButton>
          <KeyboardArrowUpIcon />
        </IconButton>
        <IconButton>
          <KeyboardArrowDownIcon />
        </IconButton>
        <IconButton>
          <ContentCopyIcon />
        </IconButton>
        <IconButton>
          <DeleteOutlineIcon />
        </IconButton>
        <IconButton>
          <AddBoxOutlinedIcon />
        </IconButton>
      </CardHelpers>
      <MediaCard />
    </Box>
  );
};

export default MediaCardWrapper;
