import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Card,
  CardContent,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import MediaCard from "./MediaCard";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import UploaderBox from "./UploaderBox";
import { useController, useForm } from "react-hook-form";

const CardHelpers = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  padding: "6px 0px 6px 0px",
}));

const MediaCardWrapper = ({
  id,
  index,
  deleteItem,
  totalItems,
  swapItems,
  title,
  description,
}) => {
  return (
    <Box sx={{ paddingTop: "26px" }}>
      <CardHelpers>
        <Typography>Item {index}, {id}</Typography>
        <IconButton>
          <VisibilityOutlinedIcon />
        </IconButton>
        <Box sx={{ flex: "1" }} />
        {totalItems > 1 && (
          <>
            <IconButton
              disabled={index === 0 ? true : false}
              aria-label="move up"
              onClick={() => swapItems(index, index - 1)}
            >
              <KeyboardArrowUpIcon />
            </IconButton>
            <IconButton
              disabled={index === totalItems - 1 ? true : false}
              aria-label="move down"
              onClick={() => swapItems(index, index + 1)}
            >
              <KeyboardArrowDownIcon />
            </IconButton>
          </>
        )}
        <IconButton aria-label="copy">
          <ContentCopyIcon />
        </IconButton>
        {totalItems > 1 && (
          <IconButton aria-label="delete" onClick={() => deleteItem(id)}>
            <DeleteOutlineIcon />
          </IconButton>
        )}
        <IconButton aria-label="add">
          <AddBoxOutlinedIcon />
        </IconButton>
      </CardHelpers>
      <Card
        sx={{
          display: "flex",
          padding: 8,
        }}
      >
        <UploaderBox />
        <Box sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <CardContent sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              fullWidth
              label="Title"
              value={title}
              sx={{ paddingBottom: "12px", fontWeight: "bold" }}
            />
            <TextField
              fullWidth
              value={description}
              id="standard-textarea"
              label="Description"
              placeholder="Description about your media..."
              multiline
              variant="standard"
            />
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default MediaCardWrapper;
