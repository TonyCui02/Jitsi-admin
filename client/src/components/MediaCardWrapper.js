import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import { memo, useEffect, useState } from "react";
import UploaderBox from "./UploaderBox";

const CardHelpers = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  padding: "6px 0px 6px 0px",
}));

const MediaCardWrapper = memo(
  ({
    title,
    description,
    imgUrl,
    index,
    deleteItem,
    updateItem,
    totalItems,
    moveItemUp,
    moveItemDown,
    addItemAfter,
    // updateItemTitle,
    // swapItems,
  }) => {
    
    const updateItemTitle = (index, title) => {
      const newItem = {
        title: title,
        description,
        imgUrl,
      };
      updateItem(index, newItem);
    };

    const updateItemDescription = (index, description) => {
      const newItem = {
        title,
        description: description,
        imgUrl,
      };
      updateItem(index, newItem);
    };

    const updateItemImage = (index, imgUrl) => {
      const newItem = {
        title,
        description,
        imgUrl: imgUrl,
      };
      updateItem(index, newItem);
    };

    useEffect(() => {
      console.log("rerender");
    });

    return (
      <Box sx={{ paddingTop: "26px", display: "block" }}>
        <CardHelpers>
          <Typography>Item {index}</Typography>
          <IconButton>
            <VisibilityOutlinedIcon />
          </IconButton>
          <Box sx={{ flex: "1" }} />
          {totalItems > 1 && (
            <>
              <IconButton
                disabled={index === 0 ? true : false}
                aria-label="move up"
                onClick={() => {
                  moveItemUp(index);
                }}
              >
                <KeyboardArrowUpIcon />
              </IconButton>
              <IconButton
                disabled={index === totalItems - 1 ? true : false}
                aria-label="move down"
                onClick={() => {
                  moveItemDown(index);
                }}
              >
                <KeyboardArrowDownIcon />
              </IconButton>
            </>
          )}
          <IconButton aria-label="copy">
            <ContentCopyIcon />
          </IconButton>
          {totalItems > 1 && (
            <IconButton aria-label="delete" onClick={() => deleteItem(index)}>
              <DeleteOutlineIcon />
            </IconButton>
          )}
          <IconButton
            aria-label="add after"
            onClick={() => {
              addItemAfter(index);
            }}
          >
            <AddBoxOutlinedIcon />
          </IconButton>
        </CardHelpers>
        <Card
          sx={{
            display: "flex",
            padding: 8,
          }}
        >
          <UploaderBox
            index={index}
            updateItemImage={updateItemImage}
            imgUrl={imgUrl}
          />
          <Box sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
            <CardContent sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  fullWidth
                  label="Title"
                  value={title || ""}
                  onChange={(e) => updateItemTitle(index, e.target.value)}
                  sx={{ paddingBottom: "12px", fontWeight: "bold" }}
                />
                <TextField
                  fullWidth
                  value={description || ""}
                  onChange={(e) => updateItemDescription(index, e.target.value)}
                  id="standard-textarea"
                  label="Description"
                  placeholder="Description about your media..."
                  multiline
                  variant="standard"
                />
              </Box>
            </CardContent>
          </Box>
        </Card>
      </Box>
    );
  }
);

export default MediaCardWrapper;
